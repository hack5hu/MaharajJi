import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Plus, CalendarPlus } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { ManageBookingsTemplate } from '@/components/templates/ManageBookingsTemplate';
import { SessionCard } from '@/components/molecules/SessionCard';
import { Chip } from '@/components/atoms/Chip';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { useManageBookings } from './useManageBookings';
import { SessionData, SessionFilter } from './types.d';
import { ScreenContainer, EmptyStateContainer, EmptyIconWrapper } from './ManageBookings.styles';

export const ManageBookings = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'customers' | 'settings'>('bookings');

  const {
    activeFilter,
    handleFilterChange,
    onCreateSessionPress,
    onEditSession,
    onDeleteSession,
    onViewSession,
    onMenuPress,
    filteredSessions,
  } = useManageBookings();

  const handleTabChange = useCallback((tab: any) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigation.navigate('AdminDashboardHome');
    } else if (tab === 'customers') {
      navigation.navigate('ManageUsersAdmin');
    }
  }, [navigation]);

  const renderFilterChips = () => {
    const filters: { id: SessionFilter; labelKey: string }[] = [
      { id: 'all', labelKey: 'admin.manage_sessions.filter_all' },
      { id: 'active', labelKey: 'admin.manage_sessions.filter_active' },
      { id: 'draft', labelKey: 'admin.manage_sessions.filter_drafts' },
      { id: 'past', labelKey: 'admin.manage_sessions.filter_past' },
    ];

    return filters.map(filter => (
      <Chip
        key={filter.id}
        label={t(filter.labelKey)}
        isActive={activeFilter === filter.id}
        onPress={() => handleFilterChange(filter.id)}
      />
    ));
  };

  const renderItem: ListRenderItem<SessionData> = useCallback(({ item }) => (
    <SessionCard
      title={item.title}
      status={item.status}
      date={item.date}
      time={item.time}
      publishedBy={item.publishedBy}
      onEditPress={() => onEditSession(item.id)}
      onDeletePress={() => onDeleteSession(item.id)}
      onViewPress={() => onViewSession(item.id)}
    />
  ), [onEditSession, onDeleteSession, onViewSession]);

  const renderFooter = () => {
    return (
      <Pressable onPress={onCreateSessionPress}>
        <EmptyStateContainer style={{ marginBottom: verticalScale(140) }}>
          <EmptyIconWrapper>
            <CalendarPlus color={theme.colors.primary as string} size={scale(24)} />
          </EmptyIconWrapper>
          <Typography variant="headline_md" color="on_surface_variant" style={{ fontWeight: '700' }}>
            {t('admin.manage_sessions.schedule_title')}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 4, textAlign: 'center' }}>
            {t('admin.manage_sessions.schedule_desc')}
          </Typography>
        </EmptyStateContainer>
      </Pressable>
    );
  };

  return (
    <ScreenContainer>
      <ManageBookingsTemplate
        headerTitle="Sacred Spaces"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDdkgPej1-ZMD1RWntMfClLoLSMeY5PJXMGn7b8qsZkN5jHFvYHs_TxweopJ6Fm-GlUCjKpMwL6QFOq_mwbreqb9nXLM89a-OJ7K23raNC9g7j4J0Lov7Y49PWDWHXbI0KUBVzOlWS0dwE1ECD94YnhnqFKQnZFuw5whJ4ZL7o4jlwLQWVeu-HZPiKia7iOybNLryGhgcTfYsETIwtH1vqF7LT_vbFhZCUBqJDNk1BZMPfOi3_frggoxwuC_g79Qe_WAbT7669thUg"
        onMenuPress={onMenuPress}
        onCreateSessionPress={onCreateSessionPress}
        filtersContent={renderFilterChips()}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        listContent={
          <Box style={{ flex: 1 }}>
            <FlashList
              data={filteredSessions}
              renderItem={renderItem}
              // @ts-expect-error estimatedItemSize is required but TS definition fails
              estimatedItemSize={140}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderFooter}
            />
          </Box>
        }
      />
    </ScreenContainer>
  );
});

ManageBookings.displayName = 'ManageBookings';
