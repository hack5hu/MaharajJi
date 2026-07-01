import React, { useCallback, useState } from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { CalendarPlus, Plus, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB } from '@/components/atoms/FAB';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { SessionCard } from '@/components/molecules/SessionCard';
import { Chip } from '@/components/atoms/Chip';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { Input } from '@/components/atoms/Input';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { useManageBookings } from './useManageBookings';
import { SessionData, SessionFilter } from './types.d';
import {
  ScreenContainer,
  ScreenTitleWrapper,
  SearchAndFilterWrapper,
  StyledEmptyStateContainer,
  EmptyIconWrapper,
  ListContainer,
  FooterContainer,
  EmptyStateTitle,
  EmptyStateDesc,
} from './ManageBookings.styles';

export const ManageBookings = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'customers' | 'settings'>('bookings');
  const [sessionToCancel, setSessionToCancel] = useState<string | null>(null);

  const {
    searchQuery,
    handleSearchChange,
    activeFilter,
    handleFilterChange,
    onCreateSessionPress,
    onDeleteSession,
    onViewSession,
    filteredSessions,
    handleLoadMore,
    isFetchingMore,
  } = useManageBookings();

  const handleTabChange = useCallback((tab: any) => {
    if (tab === 'dashboard') {
      navigation.navigate('AdminDashboardHome');
    } else if (tab === 'customers') {
      navigation.navigate('ManageUsersAdmin');
    } else if (tab === 'settings') {
      navigation.navigate('AdminSettings');
    }
  }, [navigation]);



  const renderItem: ListRenderItem<SessionData> = useCallback(({ item }) => (
    <SessionCard
      title={item.title}
      status={item.status}
      sessionDate={item.sessionDate}
      bookingDate={item.bookingDate}
      bookingStartTime={item.bookingStartTime}
      bookingEndTime={item.bookingEndTime}
      publishedBy={item.publishedBy}
      onDeletePress={() => setSessionToCancel(item.id)}
      onViewPress={() => onViewSession(item.id)}
      onPress={() => navigation.navigate('SessionAttendeesList', { 
        sessionId: item.id, 
        sessionTitle: item.title, 
        sessionDate: item.sessionDate,
        location: item.originalData.location,
        totalTokens: item.originalData.totalTokens
      })}
    />
  ), [onViewSession, navigation, setSessionToCancel]);

  const renderFooter = () => {
    return (
      <ListContainer>
        {isFetchingMore && (
          <FooterContainer>
            <ActivityIndicator size="small" color={theme.colors.primary as string} />
          </FooterContainer>
        )}
        {/* <Pressable onPress={onCreateSessionPress}>
          <StyledEmptyStateContainer>
            <EmptyIconWrapper>
              <CalendarPlus color={theme.colors.primary as string} size={scale(24)} />
            </EmptyIconWrapper>
            <EmptyStateTitle variant="headline_md" color="on_surface_variant">
              {t('admin.manage_sessions.schedule_title')}
            </EmptyStateTitle>
            <EmptyStateDesc variant="body_sm" color="on_surface_variant">
              {t('admin.manage_sessions.schedule_desc')}
            </EmptyStateDesc>
          </StyledEmptyStateContainer>
        </Pressable> */}
      </ListContainer>
    );
  };

  return (
    <ScreenContainer>
      <AppLayoutTemplate
        headerTitle={t('common.app_name')}
        role="admin"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrollable={false}
        hideHeader={true}
      >
        <ScreenTitleWrapper>
          <Typography variant="headline_lg" color="on_surface" style={{ fontWeight: '700', fontSize: 32, marginBottom: 8 }}>
            {t('admin.manage_sessions.title') || 'Manage Bookings'}
          </Typography>
          <Typography variant="body_lg" color="on_surface_variant">
            {t('admin.manage_sessions.subtitle') || 'Manage and coordinate upcoming spiritual events.'}
          </Typography>
        </ScreenTitleWrapper>

        <SearchAndFilterWrapper>
          <Input
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder={t('admin.manage_sessions.search_placeholder') || 'Search sessions...'}
            leftIcon={<Search color={theme.colors.outline as string} size={scale(20)} />}
          />
          <Box style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <FlashList
              data={[
                { id: 'active' as SessionFilter, labelKey: 'ACTIVE' },
                { id: 'archive' as SessionFilter, labelKey: 'ARCHIVE' },
              ]}
              renderItem={({ item }) => (
                <Box style={{ marginRight: 8 }}>
                  <Chip
                    label={item.labelKey}
                    isActive={activeFilter === item.id}
                    onPress={() => handleFilterChange(item.id)}
                  />
                </Box>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              // @ts-expect-error estimatedItemSize is required but TS definition fails
              estimatedItemSize={100}
            />
          </Box>
        </SearchAndFilterWrapper>
        <ListContainer>
          <FlashList
            data={filteredSessions}
            renderItem={renderItem}
            // @ts-expect-error estimatedItemSize is required but TS definition fails
            estimatedItemSize={140}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps="handled"
          />
        </ListContainer>
      </AppLayoutTemplate>
      <FAB 
        icon={<Plus color={theme.colors.on_primary_container as string} size={scale(24)} />}
        onPress={onCreateSessionPress}
        bottom={scale(96) + insets.bottom}
      />
      <ConfirmationModal
        visible={!!sessionToCancel}
        title={t('admin.manage_sessions.cancel_title', { defaultValue: 'Cancel Session' })}
        message={t('admin.manage_sessions.cancel_desc', { defaultValue: 'Are you sure you want to cancel this session? This action cannot be undone.' })}
        onConfirm={() => {
          if (sessionToCancel) {
            onDeleteSession(sessionToCancel);
            setSessionToCancel(null);
          }
        }}
        onDismiss={() => setSessionToCancel(null)}
        confirmLabel={t('common.confirm', { defaultValue: 'Confirm' })}
        cancelLabel={t('common.cancel', { defaultValue: 'Back' })}
      />
    </ScreenContainer>
  );
});

ManageBookings.displayName = 'ManageBookings';
