import { useState, useCallback, useEffect } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookingStatus } from '@/constants/enums';
import { ActiveBooking, BookingItem } from './types.d';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager/SessionService';
import { useIsFocused } from '@react-navigation/native';
import { Logger } from '@/utils/logger';

export const useMyBookings = () => {
  const navigation = useAppNavigation();
  const isFocused = useIsFocused();
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null);
  const [pastBookings, setPastBookings] = useState<BookingItem[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchMethod = useCallback((payload?: { page?: number; size?: number }) => {
    return SessionService.getMyBookings(payload?.page, payload?.size);
  }, []);

  const { execute: fetchMyBookings, isLoading } = useApi(fetchMethod);

  const loadBookings = useCallback(async () => {
    const res = await fetchMyBookings({ page: 0, size: 10 });
    if (res.success && res.data) {
      const sessions = res.data.content || [];
      if (sessions.length > 0) {
        // The first CONFIRMED booking is our active booking
        const active = sessions.find((s: any) => s.status === 'CONFIRMED');
        const others = sessions.filter((s: any) => s !== active || s.status !== 'CONFIRMED');

        if (active) {
          setActiveBooking({
            id: active.id,
            title: active.sessionTitle || '',
            comingUpLabel: active.status || 'Upcoming',
            date: active.sessionDate ? active.sessionDate.split('-').reverse().join('-') : '',
            time: 'All Day',
            token: active.id,
            location: active.location || 'Mathura',
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtE2JjakLNeBJmicEiJD8obcEkHelZjrpbugxmHmVnDIaFV05ZgJgdcC-PZ_Ug68oR7izHKsV-xA6FxelHeM1F_5lLICY9B28sZ-vHv3EZTr-aO563tOge6Ks9m471xcG41tD4R8ym0esE0wWWif6xKU2hXfn6oFEuwCXVW-DYJGvCAINWbhCLWncaQ4UYChG6bgBV7oFk2BhFjDlZu8DKZRrvtlUQDP31nDTDsnskDLYa6ryf8twUmK9ZXRvJxUgRUfkdSWdxdA',
            qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAjRkBCYO4Br8XlDeFLhAmou-CKysjf5JkefHepmLFsxHBjS6FPXFlwJc0dmX7gnP2J07Xr9TlZm3Bi0iflO5VCwMxW4GKHc_S0-dGEJbmLhP_yDdhko8LbjsDK1yVjI9AJYyDfY7TpxQbpvGaclpxoqLq7oOe2GWBUnZqIB_qa0KGXG06t_5DAg96BNN1CM7P-uBDSvuGOZ2fBM1Tq78r86XNUw8sg9DXq8vhekEXOZjkCcqXp__Vqxmbew8ZoZcFyrvBJP-EX44',
            status: BookingStatus.CONFIRMED,
          });
        } else {
          setActiveBooking(null);
        }

        const mappedOthers: BookingItem[] = others.map((s) => ({
          id: s.id,
          title: s.sessionTitle || '',
          date: s.sessionDate ? s.sessionDate.split('-').reverse().join('-') : '',
          time: 'All Day',
          status: s.status === 'CANCELLED' ? BookingStatus.CANCELLED : BookingStatus.COMPLETED,
          category: 'temple_hindu',
        }));
        setPastBookings(mappedOthers);
      } else {
        setActiveBooking(null);
        setPastBookings([]);
      }
    }
  }, [fetchMyBookings]);

  useEffect(() => {
    if (isFocused) {
      loadBookings();
    }
  }, [isFocused, loadBookings]);

  const handleCancelPress = useCallback(() => {
    setShowCancelModal(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    if (!activeBooking) return;
    setCancelling(true);
    try {
      const res = await SessionService.cancelCustomerBooking(activeBooking.id);
      if (res.success) {
        const cancelledItem: BookingItem = {
          id: `past_cancelled_${Date.now()}`,
          title: activeBooking.title,
          date: activeBooking.date,
          time: activeBooking.time,
          status: BookingStatus.CANCELLED,
          category: 'self_improvement',
        };
        
        setPastBookings((prev) => [cancelledItem, ...prev]);
        setActiveBooking(null);
        setSuccessMessage('Booking cancelled successfully.');
        
        setTimeout(() => {
          setSuccessMessage(null);
        }, 4000);
      } else {
        Logger.error('Failed to cancel customer booking', res.error);
      }
    } catch (error) {
      Logger.error('Error occurred while cancelling customer booking', error);
    } finally {
      setCancelling(false);
      setShowCancelModal(false);
    }
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
    isLoading,
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
