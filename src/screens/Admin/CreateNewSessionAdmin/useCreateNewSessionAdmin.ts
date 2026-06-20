import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { validateStartTime, validateEndTime } from '@/utils/dateHelpers';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { launchImageLibrary } from 'react-native-image-picker';

const sessionSchema = z.object({
  title: z.string().min(1, 'Session Title is required'),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  location: z.string().min(1, 'Location is required'),
  tokens: z.number().min(1, 'Tokens must be at least 1'),
  description: z.string().min(1, 'Description is required'),
  publishImmediately: z.boolean(),
  coverImage: z.string().optional(),
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

export const useCreateNewSessionAdmin = () => {
  const navigation = useAppNavigation();

  // Initialize with today's date and default times
  const today = new Date();
  const defaultStartTime = new Date();
  defaultStartTime.setHours(18, 0, 0, 0); // 18:00
  
  const defaultEndTime = new Date();
  defaultEndTime.setHours(19, 30, 0, 0); // 19:30

  const form = useForm<CreateSessionForm>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      date: today,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      location: '',
      tokens: 25,
      description: '',
      publishImmediately: true,
      coverImage: '',
    },
  });

  const onSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      if (selectedImage) {
        form.setValue('coverImage', selectedImage, { shouldValidate: true });
      }
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    // In a real app, make API call here using useApi and SessionService
    console.log('Valid Form Data:', data);
    navigation.goBack();
  });

  const onSaveDraft = () => {
    // Save draft logic here
    navigation.goBack();
  };

  const onMenuPress = () => {
    // open drawer/menu
  };

  return {
    form,
    onSubmit,
    onSaveDraft,
    onMenuPress,
    onSelectImage,
    navigation,
  };
};
