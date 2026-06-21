import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdminHeader } from '@/components/organisms/AdminHeader';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { FAB } from '@/components/atoms/FAB';
import { Plus } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  TitleAndButtonRow,
  TitleWrapper,
  FiltersWrapper,
  ListContainer,
} from './ManageBookingsTemplate.styles';
import { ManageBookingsTemplateProps } from './types.d';

export const ManageBookingsTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  onCreateSessionPress,
  filtersContent,
  listContent,
  activeTab,
  onTabChange,
}: ManageBookingsTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

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
