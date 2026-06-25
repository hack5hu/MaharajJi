import { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookSessionScreenRouteProp } from './types';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager/SessionService';
import { useLocale } from '@/hooks/useLocale';
import { Logger } from '@/utils/logger';

export const useBookSession = () => {
  const navigation = useAppNavigation();
  const route = useRoute<BookSessionScreenRouteProp>();
  const session = route.params;

  const [seats, setSeats] = useState(1);

  // Limit maximum selection to maxPeoplePerToken or slotsLeft, whichever is lower
  const maxSeats = Math.min(session?.maxPeoplePerToken || 5, session?.slotsLeft || 5);

  const handleIncrement = useCallback(() => {
    setSeats((prev) => Math.min(prev + 1, maxSeats));
  }, [maxSeats]);

  const handleDecrement = useCallback(() => {
    setSeats((prev) => Math.max(prev - 1, 1));
  }, []);

  const { execute: bookSession, isLoading } = useApi((payload: { id: string, num: number }) => SessionService.bookSession(payload.id, payload.num));
  const { t } = useLocale();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = useCallback(async () => {
    if (!session?.sessionId) return;
    
    setErrorMessage(null);
    const response = await bookSession({ id: session.sessionId, num: seats });
    console.log(response)
    if (response.success && response.data) {
      const data = typeof response.data === 'object' ? response.data : {};
      const tokenNumber = data.tokenNumber || 0;
      const location = data.location || session?.location || '';
      const date = data.sessionDate ? data.sessionDate.split('-').reverse().join('-') : session?.date || '';

      navigation.navigate('BookingSuccessful', {
        tokenNumber,
        date,
        attendees: seats,
        location,
        imageUrl: session?.imageUrl || '',
      });
    } else {
      const msg = response.error?.message || t('user.errors.server_error', { defaultValue: 'Something went wrong. Please try again.' });
      setErrorMessage(msg);
      Logger.error('Booking Error', msg);
    }
  }, [navigation, session, seats, bookSession, t]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    seats,
    maxSeats,
    errorMessage,
    clearErrorMessage,
    handleIncrement,
    handleDecrement,
    handleConfirm,
    handleBack,
    session,
    isLoading,
  };
};
