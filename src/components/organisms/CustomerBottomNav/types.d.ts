import { ViewStyle } from 'react-native';

export interface CustomerBottomNavProps {
  activeTab: 'home' | 'bookings' | 'profile';
  onTabChange: (tab: 'home' | 'bookings' | 'profile') => void;
  style?: ViewStyle;
}
