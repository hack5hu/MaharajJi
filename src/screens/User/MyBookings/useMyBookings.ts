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
  const [activeBookings, setActiveBookings] = useState<ActiveBooking[]>([]);
  const [pastBookings, setPastBookings] = useState<BookingItem[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchMethod = useCallback((payload?: { page?: number; size?: number }) => {
    return SessionService.getMyBookings(payload?.page, payload?.size);
  }, []);

  const { execute: fetchMyBookings, isLoading } = useApi(fetchMethod);

  const loadBookings = useCallback(async (pageNum: number = 0) => {
    if (pageNum === 0) {
      setHasMore(true);
    } else {
      setIsFetchingMore(true);
    }

    const res = await fetchMyBookings({ page: pageNum, size: 10 });
    if (res.success && res.data) {
      const sessions = res.data.content || [];
      const totalPages = res.data.totalPages || 1;
      
      if (pageNum >= totalPages - 1) {
        setHasMore(false);
      }

      // Filter and sort active bookings
      const actives = sessions.filter((s: any) => 
        (s.sessionState === 'LIVE' || s.sessionState === 'UPCOMING') && s.status === 'CONFIRMED'
      );
      
      actives.sort((a: any, b: any) => {
        if (a.sessionState === 'LIVE' && b.sessionState !== 'LIVE') return -1;
        if (a.sessionState !== 'LIVE' && b.sessionState === 'LIVE') return 1;
        return 0;
      });

      const mappedActives: ActiveBooking[] = actives.map((active: any) => ({
        id: active.id,
        title: active.sessionTitle || '',
        comingUpLabel: active.sessionState || 'Upcoming',
        date: active.sessionDate ? active.sessionDate.split('-').reverse().join('-') : '',
        token: active.id,
        location: active.location || 'Mathura',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtE2JjakLNeBJmicEiJD8obcEkHelZjrpbugxmHmVnDIaFV05ZgJgdcC-PZ_Ug68oR7izHKsV-xA6FxelHeM1F_5lLICY9B28sZ-vHv3EZTr-aO563tOge6Ks9m471xcG41tD4R8ym0esE0wWWif6xKU2hXfn6oFEuwCXVW-DYJGvCAINWbhCLWncaQ4UYChG6bgBV7oFk2BhFjDlZu8DKZRrvtlUQDP31nDTDsnskDLYa6ryf8twUmK9ZXRvJxUgRUfkdSWdxdA',
        tokenNumber: active.tokenNumber || 0,
        numberOfPeople: active.numberOfPeople || 1,
        status: BookingStatus.CONFIRMED,
      }));

      // Filter past/history bookings
      const others = sessions.filter((s: any) => 
        s.status === 'CANCELLED' || s.status === 'COMPLETED' || s.sessionState === 'COMPLETED' || s.sessionState === 'CANCELLED'
      );

      const mappedOthers: BookingItem[] = others.map((s: any) => ({
        id: s.id,
        title: s.sessionTitle || '',
        date: s.sessionDate ? s.sessionDate.split('-').reverse().join('-') : '',
        time: s.bookingOpenTime ? s.bookingOpenTime.slice(0, 5) : 'All Day',
        status: s.status === 'CANCELLED' || s.sessionState === 'CANCELLED' ? BookingStatus.CANCELLED : BookingStatus.COMPLETED,
        category: 'temple_hindu',
      }));

      if (pageNum === 0) {
        setActiveBookings(mappedActives);
        setPastBookings(mappedOthers);
      } else {
        setActiveBookings(prev => [...prev, ...mappedActives]);
        setPastBookings(prev => [...prev, ...mappedOthers]);
      }
    }
    setIsFetchingMore(false);
  }, [fetchMyBookings]);

  useEffect(() => {
    if (isFocused) {
      setPage(0);
      loadBookings(0);
    }
  }, [isFocused, loadBookings]);

  const loadMoreBookings = useCallback(() => {
    if (!isLoading && !isFetchingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadBookings(nextPage);
    }
  }, [isLoading, isFetchingMore, hasMore, page, loadBookings]);

  const handleCancelPress = useCallback((bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelModal(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    if (!bookingToCancel) return;
    setCancelling(true);
    try {
      const res = await SessionService.cancelCustomerBooking(bookingToCancel);
      if (res.success) {
        const activeToCancel = activeBookings.find(b => b.id === bookingToCancel);
        
        if (activeToCancel) {
          const cancelledItem: BookingItem = {
            id: `past_cancelled_${Date.now()}`,
            title: activeToCancel.title,
            date: activeToCancel.date,
            time: activeToCancel.time,
            status: BookingStatus.CANCELLED,
            category: 'self_improvement',
          };
          
          setPastBookings((prev) => [cancelledItem, ...prev]);
          setActiveBookings((prev) => prev.filter(b => b.id !== bookingToCancel));
        }
        
        setBookingToCancel(null);
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
      setBookingToCancel(null);
    }
  }, [bookingToCancel, activeBookings]);

  const handleDismissCancel = useCallback(() => {
    setShowCancelModal(false);
    setBookingToCancel(null);
  }, []);

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
    activeBookings,
    pastBookings,
    isLoading: isLoading && page === 0,
    isFetchingMore,
    showCancelModal,
    cancelling,
    successMessage,
    bookingToCancel,
    loadMoreBookings,
    handleCancelPress,
    handleConfirmCancel,
    handleDismissCancel,
    handleTabChange,
  };
};
