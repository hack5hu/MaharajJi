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
        <TitleAndButtonRow>
          <TitleWrapper>
            <Typography variant="headline_lg" color="on_surface" style={{ fontWeight: '700' }}>
              {t('admin.manage_sessions.title')}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 2 }}>
              {t('admin.manage_sessions.subtitle')}
            </Typography>
          </TitleWrapper>
          <Button
            label={t('admin.manage_sessions.create_button')}
            onPress={onCreateSessionPress}
            variant="primary"
            style={{ 
              height: scale(40), 
              paddingVertical: 0, 
              paddingHorizontal: scale(12),
              borderRadius: theme.rounded.lg,
              backgroundColor: theme.colors.primary_container,
            }}
          />
        </TitleAndButtonRow>

        <FiltersWrapper>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: scale(8), paddingBottom: scale(4) }}>
            {filtersContent}
          </ScrollView>
        </FiltersWrapper>

        <ListContainer>
          {listContent}
        </ListContainer>
      </ContentContainer>

      {/* Floating Action Button (FAB) for creating new sessions as well */}
      <FAB
        icon={<Plus color={theme.colors.on_primary as string} size={scale(24)} />}
        onPress={onCreateSessionPress}
        bottom={scale(96) + insets.bottom}
      />

      <AdminBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </TemplateContainer>
  );
});

ManageBookingsTemplate.displayName = 'ManageBookingsTemplate';
