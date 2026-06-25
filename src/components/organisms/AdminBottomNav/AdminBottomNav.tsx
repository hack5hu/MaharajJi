import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles/scaling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, Users, Calendar, CircleUser } from 'lucide-react-native';
import { NavContainer, TabPressable, IconContainer } from './AdminBottomNav.styles';
import { useLocale } from '@/hooks/useLocale';

export interface AdminBottomNavProps {
  activeTab: 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => void;
  style?: ViewStyle;
}

export const AdminBottomNav = React.memo(({ activeTab, onTabChange, style }: AdminBottomNavProps) => {
  const theme = useTheme() as ThemeType;
  const insets = useSafeAreaInsets();
  const { t } = useLocale();

  const getIcon = (id: string, color: string, size: number) => {
    switch (id) {
      case 'dashboard': return <LayoutDashboard color={color} size={size} />;
      case 'customers': return <Users color={color} size={size} />;
      case 'bookings': return <Calendar color={color} size={size} />;
      case 'settings': return <CircleUser color={color} size={size} />;
      default: return null;
    }
  };

  const renderTab = (id: 'dashboard' | 'bookings' | 'customers' | 'settings', label: string) => {
    const isActive = activeTab === id;
    const iconColor = isActive ? theme.colors.on_primary_container : theme.colors.on_surface_variant;
    
    return (
      <TabPressable key={id} onPress={() => onTabChange(id)}>
        <IconContainer isActive={isActive}>
          {getIcon(id, iconColor, moderateScale(24))}
        </IconContainer>
        <Typography variant="label_caps" color={isActive ? 'on_surface' : 'on_surface_variant'} style={{ textTransform: 'none' }}>
          {label}
        </Typography>
      </TabPressable>
    );
  };

  return (
    <NavContainer insetsBottom={insets.bottom} style={style}>
      {renderTab('dashboard', t('common.nav_dashboard'))}
      {renderTab('customers', t('common.nav_customers'))}
      {renderTab('bookings', t('common.nav_bookings'))}
      {renderTab('settings', t('common.nav_profile'))}
    </NavContainer>
  );
});

AdminBottomNav.displayName = 'AdminBottomNav';
