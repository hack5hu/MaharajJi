import { useState, useCallback, useMemo, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { SessionData, SessionFilter } from './types.d';
import { useApi } from '@/hooks/useApi';
import { SessionService } from '@/serviceManager/SessionService';
import { AdminSession } from '@/serviceManager/types.d';
import { useSessionStore } from '@/stores/useSessionStore';

export const useManageBookings = () => {
  const navigation = useAppNavigation();
  const [activeFilter, setActiveFilter] = useState<SessionFilter>('all');
  
  const sessions = useSessionStore(state => state.sessions);
  const isFetching = useSessionStore(state => state.isFetching);
  const fetchSessions = useSessionStore(state => state.fetchSessions);
  const updateSessionStatus = useSessionStore(state => state.updateSessionStatus);
  const fetchNextPageSessions = useSessionStore(state => state.fetchNextPageSessions);
  const isFetchingNextPage = useSessionStore(state => state.isFetchingNextPage);
  const hasMore = useSessionStore(state => state.hasMore);

  const { execute: cancelSession, isLoading: isCancelling } = useApi(SessionService.cancelSession);

  useEffect(() => {
    // Call API in the background on mount
    fetchSessions(true);
  }, [fetchSessions]);

  const handleLoadMore = useCallback(() => {
    fetchNextPageSessions();
  }, [fetchNextPageSessions]);

  const formatTimeStr = (timeStr?: string) => {
    if (!timeStr) return '';
    try {
      // 'HH:mm:ss' to 'hh:mm a'
      const d = parse(timeStr, 'HH:mm:ss', new Date());
      return format(d, 'hh:mm a');
    } catch (e) {
      return timeStr;
    }
  };

  const allSessions: SessionData[] = useMemo(() => {
    return (sessions || []).map((s) => {
      // Map API status to UI status
      let uiStatus: SessionData['status'] = 'active';
      if (s.status === 'PUBLISHED') uiStatus = 'active';
      else if (s.status === 'CANCELLED') uiStatus = 'past';
      else if (s.status === 'DRAFT') uiStatus = 'draft';

      return {
        id: s.id,
        title: s.title,
        status: uiStatus,
        sessionDate: s.sessionDate ? s.sessionDate.split('-').reverse().join('-') : '',
        bookingDate: s.bookingOpenDate ? s.bookingOpenDate.split('-').reverse().join('-') : '',
        bookingStartTime: formatTimeStr(s.bookingOpenTime),
        bookingEndTime: formatTimeStr(s.bookingCloseTime),
        publishedBy: {
          name: s.createdByAdminName,
        },
        originalData: s,
      } as SessionData & { originalData: AdminSession };
    });
  }, [sessions]);

  // Handlers
  const handleFilterChange = useCallback((filter: SessionFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleCreateSessionPress = useCallback(() => {
    navigation.navigate('CreateNewSessionAdmin');
  }, [navigation]);

  const handleDeleteSession = useCallback(async (id: string) => {
    // Optimistic update locally: mark as CANCELLED
    updateSessionStatus(id, 'CANCELLED');
    const res = await cancelSession(id);
    if (!res.success) {
      // If it fails, refresh the list to restore the previous status
      fetchSessions();
    }
  }, [cancelSession, updateSessionStatus, fetchSessions]);

  const handleViewSession = useCallback((id: string) => {
    console.log('View session clicked', id);
  }, []);

  const handleMenuPress = useCallback(() => {
    console.log('AdminHeader menu notification pressed');
  }, []);

  // Derived filter state
  const filteredSessions = useMemo(() => {
    if (activeFilter === 'all') return allSessions;
    return allSessions.filter(session => session.status === activeFilter);
  }, [allSessions, activeFilter]);

  return {
    activeFilter,
    handleFilterChange,
    onCreateSessionPress: handleCreateSessionPress,
    onDeleteSession: handleDeleteSession,
    onViewSession: handleViewSession,
    onMenuPress: handleMenuPress,
    filteredSessions,
    isLoading: isFetching || isCancelling,
    handleLoadMore,
    isFetchingMore: isFetchingNextPage,
    hasMore,
  };
};
