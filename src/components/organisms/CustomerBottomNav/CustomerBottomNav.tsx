import React from 'react';
import { Home, Calendar, History, User } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles/scaling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavContainer, TabPressable, IconContainer } from './CustomerBottomNav.styles';
import { CustomerBottomNavProps } from './types.d';

export const CustomerBottomNav = React.memo(({ activeTab, onTabChange, style }: CustomerBottomNavProps) => {
  const theme = useTheme() as ThemeType;
  const insets = useSafeAreaInsets();

  const getIcon = (id: string, color: string, size: number) => {
    switch (id) {
      case 'home': return <Home color={color} size={size} />;
      case 'bookings': return <Calendar color={color} size={size} />;
      case 'history': return <History color={color} size={size} />;
      case 'profile': return <User color={color} size={size} />;
      default: return null;
    }
  };

  const renderTab = (id: 'home' | 'bookings' | 'history' | 'profile', label: string) => {
    const isActive = activeTab === id;
    const iconColor = isActive ? theme.colors.primary : theme.colors.on_surface_variant;
    
    return (
      <TabPressable key={id} onPress={() => onTabChange(id)}>
        <IconContainer isActive={isActive}>
          {getIcon(id, iconColor as string, moderateScale(22))}
        </IconContainer>
        <Typography 
          variant="label_caps" 
          color={isActive ? 'primary' : 'on_surface_variant'} 
          style={{ textTransform: 'none', fontWeight: isActive ? '700' : '500' }}
        >
          {label}
        </Typography>
      </TabPressable>
    );
  };

  return (
    <NavContainer insetsBottom={insets.bottom} style={style}>
      {renderTab('home', 'Home')}
      {renderTab('bookings', 'Bookings')}
      {renderTab('history', 'History')}
      {renderTab('profile', 'Profile')}
    </NavContainer>
  );
});

CustomerBottomNav.displayName = 'CustomerBottomNav';
