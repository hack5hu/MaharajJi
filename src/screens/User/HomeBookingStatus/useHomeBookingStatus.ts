import { useState, useCallback, useMemo } from 'react';
import { BookingStateMode, ActiveSessionBooking } from './types.d';

export const useHomeBookingStatus = () => {
  const [mode, setMode] = useState<BookingStateMode>('available');

  const activeSession: ActiveSessionBooking = useMemo(() => ({
    title: 'Sabbath Morning Prayer',
    comingUpLabel: 'Coming Up This Sunday',
    date: 'Oct 22, 2023',
    time: '09:00 AM',
    slotsLeft: 12,
    totalSlots: 16,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEtE2JjakLNeBJmicEiJD8obcEkHelZjrpbugxmHmVnDIaFV05ZgJgdcC-PZ_Ug68oR7izHKsV-xA6FxelHeM1F_5lLICY9B28sZ-vHv3EZTr-aO563tOge6Ks9m471xcG41tD4R8ym0esE0wWWif6xKU2hXfn6oFEuwCXVW-DYJGvCAINWbhCLWncaQ4UYChG6bgBV7oFk2BhFjDlZu8DKZRrvtlUQDP31nDTDsnskDLYa6ryf8twUmK9ZXRvJxUgRUfkdSWdxdA',
  }), []);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'available' ? 'empty' : 'available');
  }, []);

  const handleReservePress = useCallback(() => {
    console.log('Reserve Seat Pressed for: ', activeSession.title);
  }, [activeSession]);

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
    mode,
    toggleMode,
    activeSession,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
    handleMenuPress,
  };
};
