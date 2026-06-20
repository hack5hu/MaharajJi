import React from 'react';
import { ViewStyle, SafeAreaView } from 'react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TemplateContainer, HeaderWrapper, StyledScrollView, BottomNavWrapper } from './AdminDashboardHomeTemplate.styles';
export interface AdminDashboardHomeTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  activeTab: 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AdminDashboardHomeTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  activeTab,
  onTabChange,
  children,
  style
}: AdminDashboardHomeTemplateProps) => {
  const theme = useTheme() as ThemeType;
  const insets = useSafeAreaInsets();

  return (
    <TemplateContainer style={style}>
      <HeaderWrapper paddingTop={insets.top}>
        <AdminHeader title={headerTitle} avatarUrl={avatarUrl as string} onMenuPress={onMenuPress} />
      </HeaderWrapper>
      
      <StyledScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </StyledScrollView>

      <BottomNavWrapper>
        <AdminBottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </BottomNavWrapper>
    </TemplateContainer>
  );
});

AdminDashboardHomeTemplate.displayName = 'AdminDashboardHomeTemplate';
