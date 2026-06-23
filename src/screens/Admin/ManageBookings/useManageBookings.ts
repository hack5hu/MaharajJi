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
  const [activeFilter, setActiveFilter] = useState<SessionFilter>('active');
  const [localSearchQuery, setLocalSearchQuery] = useState(useSessionStore.getState().searchQuery);
  
  const sessions = useSessionStore(state => state.sessions);
  const isFetching = useSessionStore(state => state.isFetching);
  const fetchSessions = useSessionStore(state => state.fetchSessions);
  const updateSessionStatus = useSessionStore(state => state.updateSessionStatus);
  const fetchNextPageSessions = useSessionStore(state => state.fetchNextPageSessions);
  const isFetchingNextPage = useSessionStore(state => state.isFetchingNextPage);
  const hasMore = useSessionStore(state => state.hasMore);

  const { execute: cancelSession, isLoading: isCancelling } = useApi(SessionService.cancelSession);

  const getTabNumber = useCallback((filter: SessionFilter): number => {
    if (filter === 'active') return 2;
    if (filter === 'archive') return 3;
    return 2;
  }, []);

  useEffect(() => {
    // Fetch sessions whenever active filter tab changes
    fetchSessions(true, getTabNumber(activeFilter));
  }, [activeFilter, fetchSessions, getTabNumber]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearchQuery.length >= 3 || localSearchQuery.length === 0) {
        if (localSearchQuery !== useSessionStore.getState().searchQuery) {
          useSessionStore.getState().setSearchQuery(localSearchQuery);
          fetchSessions(true, getTabNumber(activeFilter));
        }
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [localSearchQuery, activeFilter, getTabNumber, fetchSessions]);

  const handleLoadMore = useCallback(() => {
    fetchNextPageSessions(getTabNumber(activeFilter));
  }, [activeFilter, fetchNextPageSessions, getTabNumber]);

  const formatTimeStr = (timeStr?: string) => {
    if (!timeStr) return '';
    try {
      // 'HH:mm:ss' to 'hh:mm a'
      const d = parse(timeStr, 'HH:mm:ss', new Date());
      return format(d, 'hh:mm a');
    } catch {
      return timeStr;
    }
  };

  const allSessions: SessionData[] = useMemo(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    return (sessions || []).map((s) => {
      // Map API status directly to UI status
      const uiStatus: SessionData['status'] = (s.sessionState as any) || 'LIVE';

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
  const handleSearchChange = useCallback((query: string) => {
    setLocalSearchQuery(query);
  }, []);

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

  const filteredSessions = useMemo(() => {
    let result = allSessions;
    if (activeFilter === 'active') {
      result = result.filter(session => session.status === 'LIVE' || session.status === 'UPCOMING');
    } else if (activeFilter === 'archive') {
      result = result.filter(session => session.status === 'COMPLETED' || session.status === 'CANCELLED');
    }
    
    // Frontend search filtering removed to rely entirely on backend
    
    return result;
  }, [allSessions, activeFilter]);

  return {
    searchQuery: localSearchQuery,
    handleSearchChange,
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
