import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { scale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  FiltersWrapper,
  ListContainer,
} from './ManageBookingsTemplate.styles';
import { ManageBookingsTemplateProps } from './types.d';

export const ManageBookingsTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  filtersContent,
  listContent,
  activeTab,
  onTabChange,
}: ManageBookingsTemplateProps) => {
  const insets = useSafeAreaInsets();

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <AdminHeader title={headerTitle} avatarUrl={avatarUrl as string} onMenuPress={onMenuPress} />
      </HeaderWrapper>

      <ContentContainer>
        <FiltersWrapper>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: scale(8), paddingBottom: scale(4) }}>
            {filtersContent}
          </ScrollView>
        </FiltersWrapper>

        <ListContainer>
          {listContent}
        </ListContainer>
      </ContentContainer>

      <AdminBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </TemplateContainer>
  );
});

ManageBookingsTemplate.displayName = 'ManageBookingsTemplate';
