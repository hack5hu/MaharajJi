import React from 'react';

export interface AppLayoutTemplateProps {
  headerTitle: string;
  role: 'user' | 'admin';
  activeTab: 'home' | 'bookings' | 'history' | 'profile' | 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: any) => void;
  children?: React.ReactNode;
  scrollable?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  headerRight?: React.ReactNode;
  hideHeader?: boolean;
}
