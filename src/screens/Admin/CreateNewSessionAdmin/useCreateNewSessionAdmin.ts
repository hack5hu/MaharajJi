import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDays } from 'date-fns';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.d';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager';
import { CreateSessionRequest, LocationData } from '@/serviceManager/types.d';
import { useMemo, useEffect, useState } from 'react';

const sessionSchema = z.object({
  title: z.string().min(1, 'admin.create_session.error_title_req'),
  date: z.date(),
  location: z.string().min(1, 'admin.create_session.error_location_req'),
  tokens: z.number().min(1, 'admin.create_session.error_tokens_min'),
  maxPeoplePerToken: z.number().min(1, 'admin.create_session.error_max_users_min'),
  bookingOpenDate: z.date(),
  bookingOpenTime: z.date(),
  bookingCloseTime: z.date(),
}).superRefine((data, ctx) => {
  // Booking close time must be at least 1 hour after booking open time
  const diffInMinutes = (data.bookingCloseTime.getTime() - data.bookingOpenTime.getTime()) / (1000 * 60);
  if (diffInMinutes < 60) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'admin.create_session.error_time_gap',
      path: ['bookingCloseTime']
    });
  }
});

export type CreateSessionForm = z.infer<typeof sessionSchema>;

const pad = (n: number) => n.toString().padStart(2, '0');
const formatDateLocal = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const formatTimeLocal = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const parseDateString = (dateStr: string) => {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date();
  d.setFullYear(year, month - 1, day);
  return d;
};

const parseTimeString = (dateObj: Date, timeStr: string) => {
  if (!timeStr) return dateObj;
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const d = new Date(dateObj);
  d.setHours(hours || 0, minutes || 0, seconds || 0, 0);
  return d;
};

export const useCreateNewSessionAdmin = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CreateNewSessionAdmin'>>();
  const editSession = route.params?.session;
  
  const [apiError, setApiError] = useState<string | null>(null);
  const { execute: createSession, isLoading: isCreating } = useApi(SessionService.createSession);
  const { execute: fetchLocations, isLoading: isLocationsLoading } = useApi(SessionService.getLocations);

  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      const result = await fetchLocations(undefined);
      if (result.success && result.data && result.data.length > 0) {
        setLocations(result.data.filter(loc => loc.active));
      } else {
        // Fallback if API fails or returns empty
        setLocations([{ 
          id: '1', 
          name: 'Main Hall', 
          active: true, 
          description: '', 
          createdAt: new Date().toISOString() 
        }]);
      }
    };
    loadLocations();
  }, [fetchLocations]);

  const defaultValues = useMemo(() => {
    const today = new Date();
    
    if (editSession) {
      const parsedDate = parseDateString(editSession.sessionDate);
      const parsedStartTime = parseTimeString(parsedDate, editSession.bookingOpenTime || '09:00:00');
      const parsedEndTime = parseTimeString(parsedDate, editSession.bookingCloseTime || '10:00:00');
      
      return {
        title: editSession.title || '',
        date: parsedDate,
        location: editSession.location || '',
        tokens: editSession.totalTokens || 25,
        maxPeoplePerToken: editSession.maxPeoplePerToken || 4,
        bookingOpenDate: editSession.bookingOpenDate ? parseDateString(editSession.bookingOpenDate) : addDays(parsedDate, -1),
        bookingOpenTime: parsedStartTime,
        bookingCloseTime: parsedEndTime,
      };
    }

    const defaultBookingOpenTime = new Date();
    defaultBookingOpenTime.setHours(9, 0, 0, 0); // 09:00 AM

    const defaultBookingCloseTime = new Date();
    defaultBookingCloseTime.setHours(10, 0, 0, 0); // 10:00 AM

    return {
      title: '',
      date: addDays(today, 1),
      location: '',
      tokens: 25,
      maxPeoplePerToken: 4,
      bookingOpenDate: today,
      bookingOpenTime: defaultBookingOpenTime,
      bookingCloseTime: defaultBookingCloseTime,
    };
  }, [editSession]);

  const form = useForm<CreateSessionForm>({
    resolver: zodResolver(sessionSchema),
    defaultValues,
  });

  const { control, setValue } = form;

  const watchedDate = useWatch({ control, name: 'date' });
  const watchedBookingOpenTime = useWatch({ control, name: 'bookingOpenTime' });

  // Sync bookingOpenDate to be 1 day before selected date
  useEffect(() => {
    if (watchedDate && !editSession) {
      setValue('bookingOpenDate', addDays(watchedDate, -1), { shouldValidate: true });
    }
  }, [watchedDate, setValue, editSession]);

  // Sync bookingCloseTime when bookingOpenTime changes
  useEffect(() => {
    if (watchedBookingOpenTime && !editSession) {
      const newCloseTime = new Date(watchedBookingOpenTime);
      newCloseTime.setHours(newCloseTime.getHours() + 1);
      setValue('bookingCloseTime', newCloseTime, { shouldValidate: true });
    }
  }, [watchedBookingOpenTime, setValue, editSession]);

  const onSubmit = form.handleSubmit(async (data) => {
    setApiError(null);
    const payload: CreateSessionRequest = {
      title: data.title,
      description: '', // Hardcoded as requested
      sessionDate: formatDateLocal(data.date),
      location: data.location,
      totalTokens: data.tokens,
      maxPeoplePerToken: data.maxPeoplePerToken,
      bookingOpenDate: formatDateLocal(data.bookingOpenDate),
      bookingOpenTime: formatTimeLocal(data.bookingOpenTime),
      bookingCloseTime: formatTimeLocal(data.bookingCloseTime),
    };

    const result = await createSession(payload);

    if (result.success) {
      // showNotification({ type: NotificationType.SUCCESS, message: 'Session saved successfully!' });
      console.log('Session Saved:', result.data);
      navigation.goBack();
    } else {
      setApiError(result.error?.message || 'Failed to create session');
    }
  });

  const onSaveDraft = () => {
    navigation.goBack();
  };

  const onMenuPress = () => {};

  return {
    form,
    onSubmit,
    onSaveDraft,
    onMenuPress,
    navigation,
    isLoading: isCreating || isLocationsLoading,
    locations,
    isEditing: !!editSession,
    apiError,
  };
};
