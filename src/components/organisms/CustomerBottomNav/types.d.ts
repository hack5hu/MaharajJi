import { ViewStyle } from 'react-native';

export interface CustomerBottomNavProps {
  activeTab: 'home' | 'bookings' | 'history' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'history' | 'profile') => void;
  style?: ViewStyle;
}
