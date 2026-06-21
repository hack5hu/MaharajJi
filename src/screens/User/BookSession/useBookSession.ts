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

  const handleConfirm = useCallback(async () => {
    if (!session?.sessionId) return;
    
    const response = await bookSession({ id: session.sessionId, num: seats });
    
    if (response.success && response.data) {
      const bookingId = response.data?.id || response.data?.bookingId || (typeof response.data === 'string' ? response.data : null) || `#SS-${Math.floor(10000 + Math.random() * 90000)}`;

      navigation.navigate('BookingSuccessful', {
        bookingId,
        date: session?.date || '',
        time: session?.time || '',
        attendees: seats,
        hall: session?.location || '',
        imageUrl: session?.imageUrl || '',
      });
    } else {
      Logger.error('Booking Error', response.error || t('user.errors.server_error', { defaultValue: 'Something went wrong. Please try again.' }));
    }
  }, [navigation, session, seats, bookSession, t]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    seats,
    maxSeats,
    handleIncrement,
    handleDecrement,
    handleConfirm,
    handleBack,
    session,
    isLoading,
  };
};
