import { ReactNode } from 'react';

export interface ProfileTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  activeTab: 'home' | 'bookings' | 'history' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'history' | 'profile') => void;
  children: ReactNode;
}
