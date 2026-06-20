import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookingStatus } from '@/constants/enums';
import { ActiveBooking, BookingItem } from './types.d';

export const useMyBookings = () => {
  const navigation = useAppNavigation();
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>({
    id: 'active_1',
    title: 'Inner Peace Sanctuary',
    comingUpLabel: 'Session Today',
    date: 'Oct 22, 2023',
    time: '14:00 - 15:30',
    token: '#SS-8821',
    location: 'Crystal Plaza, Wing B, 4th Floor',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbxKZcPU3k4Q0VSuar5-QZpnH5-wvW-1dB28YMPRkI2Ak7lE26CRlV9MA0upWc0Mn5t9LZm_lIkX6Tjz_SzavY5dcXQmErLotWf5_qdMAxfbrLE5upAogQeWJWbNb4QCscQjvIe5-gC560tCjDUG2tq5VN9L4hzFo7mftGa24iD07vQwDc7l52X630zUk5x0OU-WpiqJh8a-ee1KSGWxcsvA8lJmSTHrKE9ygaW2Z2ObNhNzAeGkVIZ9bcR_l04R5JLNj9V6KO8vo',
    qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAjRkBCYO4Br8XlDeFLhAmou-CKysjf5JkefHepmLFsxHBjS6FPXFlwJc0dmX7gnP2J07Xr9TlZm3Bi0iflO5VCwMxW4GKHc_S0-dGEJbmLhP_yDdhko8LbjsDK1yVjI9AJYyDfY7TpxQbpvGaclpxoqLq7oOe2GWBUnZqIB_qa0KGXG06t_5DAg96BNN1CM7P-uBDSvuGOZ2fBM1Tq78r86XNUw8sg9DXq8vhekEXOZjkCcqXp__Vqxmbew8ZoZcFyrvBJP-EX44',
    status: BookingStatus.CONFIRMED,
  });

  const [pastBookings, setPastBookings] = useState<BookingItem[]>([
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

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCancelPress = useCallback(() => {
    setShowCancelModal(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    if (!activeBooking) return;
    setCancelling(true);
    
    setTimeout(() => {
      const cancelledItem: BookingItem = {
        id: `past_cancelled_${Date.now()}`,
        title: activeBooking.title,
        date: `${activeBooking.date} • 02:00 PM`,
        status: BookingStatus.CANCELLED,
        category: 'self_improvement',
      };
      
      setPastBookings((prev) => [cancelledItem, ...prev]);
      setActiveBooking(null);
      setCancelling(false);
      setShowCancelModal(false);
      setSuccessMessage('Booking cancelled successfully.');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    }, 1500);
  }, [activeBooking]);

  const handleDismissCancel = useCallback(() => {
    setShowCancelModal(false);
  }, []);

  const handleDirectionsPress = useCallback(() => {
    console.log('Get directions pressed for: ', activeBooking?.location);
  }, [activeBooking]);

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
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    } else if (tab === 'history') {
      navigation.navigate('History');
    }
  }, [navigation]);

  return {
    activeBooking,
    pastBookings,
    showCancelModal,
    cancelling,
    successMessage,
    handleCancelPress,
    handleConfirmCancel,
    handleDismissCancel,
    handleDirectionsPress,
    handleFilterPress,
    handleLoadMore,
    handleMenuPress,
    handleTabChange,
  };
};
