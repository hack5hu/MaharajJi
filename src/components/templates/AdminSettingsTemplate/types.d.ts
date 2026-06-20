export interface AdminSettingsTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  activeTab: 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => void;
  children: React.ReactNode;
}
