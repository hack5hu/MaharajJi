import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookingStatus } from '@/constants/enums';
import { BookingItem } from './types.d';

export const useHistory = () => {
  const navigation = useAppNavigation();

  const [pastBookings] = useState<BookingItem[]>([
    {
      id: 'past_1',
      title: 'Zen Meditation Center',
      date: 'Oct 24, 2023 • 09:00 AM',
      status: BookingStatus.COMPLETED,
      category: 'self_improvement',
    },
    {
      id: 'past_2',
      title: 'Sacred Chants Evening',
      date: 'Oct 18, 2023 • 06:30 PM',
      status: BookingStatus.COMPLETED,
      category: 'spa',
    },
    {
      id: 'past_3',
      title: 'Community Silent Prayer',
      date: 'Oct 12, 2023 • 11:00 AM',
      status: BookingStatus.CANCELLED,
      category: 'church',
    },
    {
      id: 'past_4',
      title: 'Vedic Wisdom Seminar',
      date: 'Oct 05, 2023 • 02:00 PM',
      status: BookingStatus.COMPLETED,
      category: 'temple_hindu',
    },
  ]);

  const handleFilterPress = useCallback(() => {
    console.log('Filter past bookings pressed');
  }, []);

  const handleLoadMore = useCallback(() => {
    console.log('Load more history pressed');
  }, []);

  const handleMenuPress = useCallback(() => {
    console.log('Notifications bell clicked');
  }, []);

  const handleTabChange = useCallback((tab: 'home' | 'bookings' | 'history' | 'profile') => {
    if (tab === 'home') {
      navigation.navigate('HomeBookingStatus');
    } else if (tab === 'bookings') {
      navigation.navigate('MyBookings');
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    }
  }, [navigation]);

  return {
    pastBookings,
    handleFilterPress,
    handleLoadMore,
    handleMenuPress,
    handleTabChange,
  };
};
