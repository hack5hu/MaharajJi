import { useState, useCallback, useMemo, useEffect } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { BookingStateMode, ActiveSessionBooking } from './types.d';
import { useSessionStore } from '@/stores/useSessionStore';
import { useIsFocused } from '@react-navigation/native';

export const useHomeBookingStatus = () => {
  const navigation = useAppNavigation();
  const { customerSessions, isFetchingCustomerSessions, fetchCustomerSessions } = useSessionStore();
  const isFocused = useIsFocused();

  // Fetch when screen focuses
  useEffect(() => {
    if (isFocused) {
      fetchCustomerSessions();
    }
  }, [isFocused, fetchCustomerSessions]);

  const activeSession: ActiveSessionBooking | null = useMemo(() => {
    if (!customerSessions || customerSessions.length === 0) return null;
    
    const firstSession = customerSessions[0];
    return {
      title: firstSession.title,
      comingUpLabel: 'Coming Up Next',
      date: firstSession.sessionDate,
      time: `${firstSession.bookingOpenTime || ''} - ${firstSession.bookingCloseTime || ''}`,
      slotsLeft: firstSession.availableTokens,
      totalSlots: firstSession.totalTokens,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtE2JjakLNeBJmicEiJD8obcEkHelZjrpbugxmHmVnDIaFV05ZgJgdcC-PZ_Ug68oR7izHKsV-xA6FxelHeM1F_5lLICY9B28sZ-vHv3EZTr-aO563tOge6Ks9m471xcG41tD4R8ym0esE0wWWif6xKU2hXfn6oFEuwCXVW-DYJGvCAINWbhCLWncaQ4UYChG6bgBV7oFk2BhFjDlZu8DKZRrvtlUQDP31nDTDsnskDLYa6ryf8twUmK9ZXRvJxUgRUfkdSWdxdA',
    };
  }, [customerSessions]);

  const currentMode: BookingStateMode = (activeSession && !isFetchingCustomerSessions) ? 'available' : 'empty';

  const toggleMode = useCallback(() => {
    // Only for testing toggle visually, actual mode is data-driven
    // setMode(prev => prev === 'available' ? 'empty' : 'available');
  }, []);

  const handleReservePress = useCallback(() => {
    if (!activeSession) return;
    navigation.navigate('BookSession', {
      sessionTitle: activeSession.title,
      date: activeSession.date,
      time: activeSession.time,
      imageUrl: activeSession.imageUrl,
      slotsLeft: activeSession.slotsLeft,
    });
  }, [navigation, activeSession]);

  const handleNotifyPress = useCallback(() => {
    console.log('Notify Me of New Slots Pressed');
  }, []);

  const handleViewAllPress = useCallback(() => {
    console.log('View All Sessions Pressed');
  }, []);

  const handleMenuPress = useCallback(() => {
    console.log('Notifications bell clicked');
  }, []);

  return {
    mode: currentMode,
    isFetching: isFetchingCustomerSessions,
    toggleMode,
    activeSession,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
    handleMenuPress,
  };
};
