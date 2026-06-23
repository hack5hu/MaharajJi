import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { SessionAttendeesListScreenRouteProp } from './types.d';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager/SessionService';
import { CustomerBooking } from '@/serviceManager/types.d';
import { Logger } from '@/utils/logger';

export const useSessionAttendeesList = () => {
  const navigation = useAppNavigation();
  const route = useRoute<SessionAttendeesListScreenRouteProp>();
  const { sessionId, sessionTitle, sessionDate, location, totalTokens } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [attendees, setAttendees] = useState<CustomerBooking[]>([]);
  
  const { execute: fetchAttendees, isLoading } = useApi(SessionService.getSessionAttendees);

  const loadAttendees = useCallback(async () => {
    const response = await fetchAttendees(sessionId);
    if (response.success && response.data) {
      setAttendees(response.data);
    } else {
      Logger.error('Failed to load attendees', response.error);
    }
  }, [fetchAttendees, sessionId]);

  useEffect(() => {
    loadAttendees();
  }, [loadAttendees]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleAttendeePress = useCallback((attendee: CustomerBooking) => {
    Logger.log('Attendee pressed', { id: attendee.id });
    // Future: Navigate to attendee details if needed
  }, []);

  const filteredAttendees = useMemo(() => {
    if (!searchQuery.trim()) return attendees;
    const query = searchQuery.toLowerCase().trim();
    return attendees.filter((a) =>
      a.customerName.toLowerCase().includes(query) ||
      a.customerPhone.toLowerCase().includes(query) ||
      a.tokenNumber.toString() === query 
    );
  }, [attendees, searchQuery]);

  const filledCount = useMemo(() => {
    return attendees.length;
  }, [attendees]);

  return {
    sessionTitle,
    sessionDate,
    location,
    searchQuery,
    handleSearchChange,
    attendees: filteredAttendees,
    isLoading,
    handleBackPress,
    handleAttendeePress,
    filledCount,
    totalTokens,
    totalBookings: attendees.length,
  };
};
