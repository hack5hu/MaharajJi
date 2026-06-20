import React from 'react';

export interface HomeBookingStatusTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  activeTab: 'home' | 'bookings' | 'history' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'history' | 'profile') => void;
  children: React.ReactNode;
}
