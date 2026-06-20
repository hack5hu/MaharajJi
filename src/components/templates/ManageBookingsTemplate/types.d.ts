import React from 'react';

export interface ManageBookingsTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  onCreateSessionPress: () => void;
  filtersContent: React.ReactNode;
  listContent: React.ReactNode;
  activeTab: 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => void;
}
