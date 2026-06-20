import { ReactNode } from 'react';

export interface HistoryTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  activeTab: 'home' | 'bookings' | 'history' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'history' | 'profile') => void;
  children: ReactNode;
}
