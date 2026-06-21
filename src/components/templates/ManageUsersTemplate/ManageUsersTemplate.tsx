import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { Input } from '@/components/atoms/Input';
import { FAB } from '@/components/atoms/FAB';
import { Search, UserPlus } from 'lucide-react-native';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  SearchAndFilterWrapper,
  ListContainer,
} from './ManageUsersTemplate.styles';

export interface ManageUsersTemplateProps {
  headerTitle: string;
  avatarUrl?: string;
  onMenuPress: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filtersContent: React.ReactNode;
  listContent: React.ReactNode;
  onAddPress: () => void;
  activeTab: 'dashboard' | 'bookings' | 'customers' | 'settings';
  onTabChange: (tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => void;
}

export const ManageUsersTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  searchQuery,
  onSearchChange,
  filtersContent,
  listContent,
  onAddPress,
  activeTab,
  onTabChange,
}: ManageUsersTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <AdminHeader title={headerTitle} avatarUrl={avatarUrl as string} onMenuPress={onMenuPress} />
      </HeaderWrapper>

      <ContentContainer>
        <SearchAndFilterWrapper>
          <Input 
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search by name or phone..."
            leftIcon={<Search color={theme.colors.outline as string} size={scale(20)} />}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: scale(12), paddingBottom: scale(8) }}>
            {filtersContent}
          </ScrollView>
        </SearchAndFilterWrapper>

        <ListContainer>
          {listContent}
        </ListContainer>
      </ContentContainer>

      <FAB 
        icon={<UserPlus color={theme.colors.on_primary_container as string} size={scale(24)} />}
        label="Add Customer"
        onPress={onAddPress}
        bottom={scale(96) + insets.bottom} // adjusted for bottom nav
      />

      <AdminBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </TemplateContainer>
  );
});

ManageUsersTemplate.displayName = 'ManageUsersTemplate';
