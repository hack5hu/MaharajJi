import { useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';

export const useBookingSuccessful = (bookingId?: string) => {
  const navigation = useAppNavigation();

  const handleAddCalendar = useCallback(() => {
    console.log('Add to calendar clicked for booking: ', bookingId);
  }, [bookingId]);

  const handleViewAllBookings = useCallback(() => {
    navigation.navigate('MyBookings');
  }, [navigation]);

  const handleBackHome = useCallback(() => {
    navigation.navigate('HomeBookingStatus');
  }, [navigation]);

  return {
    handleAddCalendar,
    handleViewAllBookings,
    handleBackHome,
  };
};
