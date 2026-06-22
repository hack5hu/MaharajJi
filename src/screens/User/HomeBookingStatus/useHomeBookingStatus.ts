import { useCallback, useMemo, useEffect } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookingStateMode, SessionCardUI } from './types.d';
import { format, parse } from 'date-fns';
import { useSessionStore } from '@/stores/useSessionStore';
import { useIsFocused } from '@react-navigation/native';
import { Logger } from '@/utils/logger';

export const useHomeBookingStatus = () => {
  const navigation = useAppNavigation();
  const customerSessions = useSessionStore(s => s.customerSessions);
  const isFetchingCustomerSessions = useSessionStore(s => s.isFetchingCustomerSessions);
  const fetchCustomerSessions = useSessionStore(s => s.fetchCustomerSessions);
  const isFocused = useIsFocused();

  // Fetch when screen focuses
  useEffect(() => {
    if (isFocused) {
      fetchCustomerSessions();
    }
  }, [isFocused, fetchCustomerSessions]);

  const formatTimeStr = (timeStr?: string) => {
    if (!timeStr) return '';
    try {
      const d = parse(timeStr, 'HH:mm:ss', new Date());
      return format(d, 'hh:mm a');
    } catch {
      return timeStr;
    }
  };

  const { liveSessions, upcomingSessions } = useMemo(() => {
    if (!customerSessions || customerSessions.length === 0) {
      return { liveSessions: [], upcomingSessions: [] };
    }
    
    const mapped: SessionCardUI[] = customerSessions.map(session => ({
      id: session.id,
      title: session.title,
      sessionState: session.sessionState as any,
      sessionDate: session.sessionDate ? session.sessionDate.split('-').reverse().join('-') : '',
      bookingOpenDate: session.bookingOpenDate ? session.bookingOpenDate.split('-').reverse().join('-') : '',
      bookingOpenTime: formatTimeStr(session.bookingOpenTime),
      bookingCloseTime: formatTimeStr(session.bookingCloseTime),
      slotsLeft: session.availableTokens,
      totalSlots: session.totalTokens,
      maxPeoplePerToken: session.maxPeoplePerToken,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtE2JjakLNeBJmicEiJD8obcEkHelZjrpbugxmHmVnDIaFV05ZgJgdcC-PZ_Ug68oR7izHKsV-xA6FxelHeM1F_5lLICY9B28sZ-vHv3EZTr-aO563tOge6Ks9m471xcG41tD4R8ym0esE0wWWif6xKU2hXfn6oFEuwCXVW-DYJGvCAINWbhCLWncaQ4UYChG6bgBV7oFk2BhFjDlZu8DKZRrvtlUQDP31nDTDsnskDLYa6ryf8twUmK9ZXRvJxUgRUfkdSWdxdA',
      location: session.location || '',
    }));

    return {
      liveSessions: mapped.filter(s => s.sessionState === 'LIVE'),
      upcomingSessions: mapped.filter(s => s.sessionState === 'UPCOMING'),
    };
  }, [customerSessions]);

  const currentMode: BookingStateMode = (liveSessions.length > 0 || upcomingSessions.length > 0) ? 'available' : 'empty';

  const toggleMode = useCallback(() => {
    // Only for testing toggle visually, actual mode is data-driven
    // setMode(prev => prev === 'available' ? 'empty' : 'available');
  }, []);

  const handleReservePress = useCallback((session: SessionCardUI) => {
    navigation.navigate('BookSession', {
      sessionId: session.id,
      sessionTitle: session.title,
      date: session.sessionDate,
      time: (session.bookingOpenTime && session.bookingCloseTime)
        ? `${session.bookingOpenTime} - ${session.bookingCloseTime}`
        : 'All Day',
      imageUrl: session.imageUrl,
      slotsLeft: session.slotsLeft,
      maxPeoplePerToken: session.maxPeoplePerToken,
      location: session.location,
    });
  }, [navigation]);

  const handleNotifyPress = useCallback(() => {
    Logger.log('Notify Me of New Slots Pressed');
  }, []);

  const handleViewAllPress = useCallback(() => {
    Logger.log('View All Sessions Pressed');
  }, []);

  const handleMenuPress = useCallback(() => {
    Logger.log('Notifications bell clicked');
  }, []);

  return {
    mode: currentMode,
    isFetching: isFetchingCustomerSessions,
    toggleMode,
    liveSessions,
    upcomingSessions,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
    handleMenuPress,
  };
};
