import { useState, useCallback, useMemo } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { SessionData, SessionFilter } from './types.d';

export const useManageBookings = () => {
  const navigation = useAppNavigation();
  const [activeFilter, setActiveFilter] = useState<SessionFilter>('all');

  // Mock sessions loaded from the HTML mockup
  const allSessions: SessionData[] = useMemo(() => [
    {
      id: '1',
      title: 'Sabbath Morning Prayer',
      status: 'active',
      date: 'May 12, 2024',
      time: '08:30 AM',
      publishedBy: {
        name: 'Admin Sarah',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB26kbQ_YoSWONwh7WoYNRT3PmNsDN6VJbd9kzqLbkwqmbYBicZDBwyyUB4hqFexAE-zhjlwhNdd822SNC5QqGp_vIIxDCbjtZ1_Izlnz5EiHnPcRYN5lzkAf5fVy_zjOpqlPXOMxDlcLor7T7ZlG_UM2VnAAiwTySIgRLhyTG1h4BpCRPZLiKRfVbH7IIMT_LJ8SkqOY5ilu9UxkU1vMoldRQ2Tk-asOBmDR0UiODJAho0YXkdoVrkFyoiwdfFvqJDdN56ScOgBWU',
      },
    },
    {
      id: '2',
      title: 'Monday Evening Meditation',
      status: 'draft',
      date: 'May 13, 2024',
      time: '06:00 PM',
      publishedBy: {
        name: 'Admin Marcus',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_0b-2tjre2o7LEzQ3kpGII_ja9oyZe291GB--peE3Ahch0AdcOWPooeg9_qs6FEQvpOqTCq6OMo3UkHr7VDhuNvmvTTmxF9CY5Ytrk84vw05Fjh9ZAimYIl2v-o_J3NmTlffuaM453tkyMn3RhtA_73J9TxEjm6IP2mrACJpQa_9GireEKSA1RhqnsPSH73rWeEmRXhRHIdfAsf2tgT4BMea96ekGnpmcbysMtMx8qxEF_ZHMdo2l7eFIK4q3nBhfCkaxWWQcdpk',
      },
    },
    {
      id: '3',
      title: 'Weekly Community Reflection',
      status: 'past',
      date: 'May 05, 2024',
      time: '10:00 AM',
      publishedBy: {
        name: 'Admin Anna',
      },
    },
    {
      id: '4',
      title: 'Midweek Spiritual Guidance',
      status: 'active',
      date: 'May 15, 2024',
      time: '04:00 PM',
      publishedBy: {
        name: 'Admin Sarah',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsZOmnfKzfOH6odh8cfncinulHt5hnYM4-t7jdTp14irGEejfDu42T4lOzdZoEQeAVJUeRnaxUylXAvLe823-jVR4nVu-oL3zYTYXJO269CCeeulzvUe4eSIDYKTuzQOui67dThmw1huOXmxdj3iDmoWyB1DSyQCzLT_e4yNoRbCLfKFkcmdWi64tjAgzS4B_HdVSsr7xn9UhemLbElqNmBrKISXXA3Rz0b-VDpyrKHn1HzkFjiZspxKslna8qJHXV65KdYe-Wjf4',
      },
    },
  ], []);

  // Handlers
  const handleFilterChange = useCallback((filter: SessionFilter) => {
    setActiveFilter(filter);
  }, []);

  const handleCreateSessionPress = useCallback(() => {
    navigation.navigate('CreateNewSessionAdmin');
  }, [navigation]);

  const handleEditSession = useCallback((id: string) => {
    console.log('Edit session clicked', id);
  }, []);

  const handleDeleteSession = useCallback((id: string) => {
    console.log('Delete session clicked', id);
  }, []);

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
    onEditSession: handleEditSession,
    onDeleteSession: handleDeleteSession,
    onViewSession: handleViewSession,
    onMenuPress: handleMenuPress,
    filteredSessions,
  };
};
