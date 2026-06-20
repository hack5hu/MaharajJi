import { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookSessionScreenRouteProp } from './types';

export const useBookSession = () => {
  const navigation = useAppNavigation();
  const route = useRoute<BookSessionScreenRouteProp>();
  const session = route.params;

  const [seats, setSeats] = useState(1);

  // Limit maximum selection to 5 seats or slotsLeft, whichever is lower
  const maxSeats = Math.min(5, session?.slotsLeft || 5);

  const handleIncrement = useCallback(() => {
    setSeats((prev) => Math.min(prev + 1, maxSeats));
  }, [maxSeats]);

  const handleDecrement = useCallback(() => {
    setSeats((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleConfirm = useCallback(() => {
    // Generate simulated Booking ID and Token Number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const randomToken = Math.floor(1 + Math.random() * 99);
    const bookingId = `#SS-${randomNum}`;
    const tokenNo = `A-${randomToken}`;

    navigation.navigate('BookingSuccessful', {
      bookingId,
      tokenNo,
      date: session?.date || '',
      time: session?.time || '',
      attendees: seats,
      hall: 'Main Sanctuary',
      imageUrl: session?.imageUrl || '',
    });
  }, [navigation, session, seats]);

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
  };
};
