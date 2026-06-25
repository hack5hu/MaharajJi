import { useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';

export const useBookingSuccessful = () => {
  const navigation = useAppNavigation();

  const handleViewAllBookings = useCallback(() => {
    navigation.navigate('MyBookings');
  }, [navigation]);

  const handleBackHome = useCallback(() => {
    navigation.navigate('HomeBookingStatus');
  }, [navigation]);

  return {
    handleViewAllBookings,
    handleBackHome,
  };
};
