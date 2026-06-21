import React from 'react';
import { useSessionAttendeesList } from './useSessionAttendeesList';
import { SessionAttendeesListTemplate } from '@/components/templates/SessionAttendeesListTemplate';

export const SessionAttendeesList = React.memo(() => {
  const {
    sessionTitle,
    sessionDate,
    location,
    searchQuery,
    handleSearchChange,
    attendees,
    isLoading,
    handleBackPress,
    handleAttendeePress,
    filledCount,
    totalTokens,
    totalBookings,
  } = useSessionAttendeesList();

  return (
    <SessionAttendeesListTemplate
      sessionTitle={sessionTitle}
      sessionDate={sessionDate}
      location={location}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      attendees={attendees}
      isLoading={isLoading}
      onBackPress={handleBackPress}
      onAttendeePress={handleAttendeePress}
      filledCount={filledCount}
      totalTokens={totalTokens}
      totalBookings={totalBookings}
    />
  );
});

SessionAttendeesList.displayName = 'SessionAttendeesList';
