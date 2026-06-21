import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateStartTime, validateEndTime } from '@/utils/dateHelpers';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.d';
import { launchImageLibrary } from 'react-native-image-picker';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager';
import { useLocale } from '@/hooks/useLocale';
import { NotificationType } from '@/constants/enums';
import { CreateSessionRequest, LocationData } from '@/serviceManager/types.d';
import React, { useMemo, useEffect, useState } from 'react';

const sessionSchema = z.object({
  title: z.string().min(1, 'Session Title is required'),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  location: z.string().min(1, 'Location is required'),
  tokens: z.number().min(1, 'Tokens must be at least 1'),
  maxPeoplePerToken: z.number().min(1, 'Max users per booking must be at least 1'),
  description: z.string().min(1, 'Description is required'),
  publishImmediately: z.boolean(),
}).superRefine((data, ctx) => {
  // 1. If today, start time must be > now + 1 hour
  if (!validateStartTime(data.date, data.startTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Start time must be at least 1 hour from now for today.',
      path: ['startTime']
    });
  }

  // 2. End time must be strictly after start time
  if (!validateEndTime(data.startTime, data.endTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End time must be after start time.',
      path: ['endTime']
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
  
  const { t } = useLocale();
  const { execute: createSession, isLoading: isCreating } = useApi(SessionService.createSession);
  const { execute: fetchLocations, isLoading: isLocationsLoading } = useApi(SessionService.getLocations);

  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      const result = await fetchLocations(undefined);
      if (result.success && result.data) {
        setLocations(result.data.filter(loc => loc.active));
      }
    };
    loadLocations();
  }, [fetchLocations]);

  const defaultValues = useMemo(() => {
    const today = new Date();
    
    if (editSession) {
      const parsedDate = parseDateString(editSession.sessionDate);
      const parsedStartTime = parseTimeString(parsedDate, editSession.startTime);
      const parsedEndTime = parseTimeString(parsedDate, editSession.endTime);
      
      return {
        title: editSession.title || '',
        date: parsedDate,
        startTime: parsedStartTime,
        endTime: parsedEndTime,
        location: editSession.location || 'Main Hall',
        tokens: editSession.totalTokens || 25,
        maxPeoplePerToken: editSession.maxPeoplePerToken || 4,
        description: editSession.description || '',
        publishImmediately: editSession.status === 'PUBLISHED',
      };
    }

    const defaultStartTime = new Date();
    defaultStartTime.setHours(18, 0, 0, 0); // 18:00
    
    const defaultEndTime = new Date();
    defaultEndTime.setHours(19, 30, 0, 0); // 19:30

    return {
      title: '',
      date: today,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      location: 'Main Hall',
      tokens: 25,
      maxPeoplePerToken: 4,
      description: '',
      publishImmediately: true,
    };
  }, [editSession]);

  const form = useForm<CreateSessionForm>({
    resolver: zodResolver(sessionSchema),
    defaultValues,
  });

  const watchedStartTime = useWatch({ control: form.control, name: 'startTime' });

  useEffect(() => {
    if (watchedStartTime && !editSession) {
      const newEndTime = new Date(watchedStartTime);
      newEndTime.setHours(newEndTime.getHours() + 1);
      form.setValue('endTime', newEndTime, { shouldValidate: true });
    }
  }, [watchedStartTime, form.setValue, editSession]);

  const onSubmit = form.handleSubmit(async (data) => {
    // If editing, you might need a separate API call like SessionService.updateSession
    // Since the API wasn't provided, I will just call createSession or log it.
    // Assuming for now createSession handles it or we only create.
    const payload: CreateSessionRequest = {
      title: data.title,
      description: data.description,
      sessionDate: formatDateLocal(data.date),
      startTime: formatTimeLocal(data.startTime),
      endTime: formatTimeLocal(data.endTime),
      location: data.location,
      totalTokens: data.tokens,
      maxPeoplePerToken: data.maxPeoplePerToken,
    };

    const result = await createSession(payload);

    if (result.success) {
      // showNotification({ type: NotificationType.SUCCESS, message: 'Session saved successfully!' });
      console.log('Session Saved:', result.data);
      navigation.goBack();
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
  };
};
