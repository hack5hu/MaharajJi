import React, { useState, useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { AlertTriangle, MoreHorizontal } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { useHomeBookingStatus } from './useHomeBookingStatus';
import { storage, StorageKeys } from '@/utils/storage';
import { UserSessionCard, UserSession } from '@/components/molecules/UserSessionCard';
import { SessionCardUI } from './types';
import {
  ScreenContainer,
  WelcomeSection,
  WelcomeTitle,
  WelcomeSubtitle,
  HeaderLabelContainer,
  SectionTitle,
  AvailableSlotsTag,
  TagLabel,
  GridContainer,
  AsymmetricGridCard,
  GridLabel,
  EmptyStateContainer,
  EmptyStateIconCircle,
  EmptyStateTitle,
  EmptyStateDesc,
  NotifyButton,
  NotifyButtonText,
  LoadingOverlay,
  ListContainer,
} from './HomeBookingStatus.styles';

export const HomeBookingStatus = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'history' | 'profile'>('home');

  const profileStr = storage.getString(StorageKeys.USER_PROFILE);
  const userName = profileStr ? JSON.parse(profileStr)?.name : 'Brother John';

  const {
    mode,
    isFetching,
    liveSessions,
    upcomingSessions,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
  } = useHomeBookingStatus();

  const navigation = useAppNavigation();

  const handleTabChange = useCallback((tab: 'home' | 'bookings' | 'history' | 'profile') => {
    if (tab === 'bookings') {
      navigation.navigate('MyBookings');
    } else if (tab === 'profile') {
      navigation.navigate('Profile');
    } else if (tab === 'history') {
      navigation.navigate('History');
    }
  }, [navigation]);

  const handleReserve = useCallback((session: UserSession) => {
    handleReservePress(session as unknown as SessionCardUI);
  }, [handleReservePress]);

  const listData = useMemo(() => {
    const data: any[] = [];
    if (liveSessions.length > 0) {
      data.push({ type: 'live_header', id: 'live_header' });
      liveSessions.forEach((s: any) => data.push({ type: 'live_item', session: s, id: `live_${s.id}` }));
    }
    if (upcomingSessions.length > 0) {
      data.push({ type: 'upcoming_header', id: 'upcoming_header' });
      upcomingSessions.forEach((s: any) => data.push({ type: 'upcoming_item', session: s, id: `upcoming_${s.id}` }));
    }
    if (data.length > 0) {
      data.push({ type: 'footer', id: 'footer_grid' });
    }
    return data;
  }, [liveSessions, upcomingSessions]);

  const renderWelcomeSection = () => (
    <WelcomeSection>
      <WelcomeTitle variant="headline_lg_mobile" color="on_surface">
        {t('user.home_booking_status.welcome', { name: userName })}
      </WelcomeTitle>
      <WelcomeSubtitle variant="body_sm">
        {t('user.home_booking_status.subtitle')}
      </WelcomeSubtitle>
    </WelcomeSection>
  );

  const renderItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case 'live_header':
        return (
          <HeaderLabelContainer>
            <SectionTitle variant="headline_md" color="on_surface">
              {t('user.home_booking_status.available_sessions')}
            </SectionTitle>
            <AvailableSlotsTag>
              <TagLabel variant="label_caps" color="on_primary_container">
                {t('user.home_booking_status.booking_open')}
              </TagLabel>
            </AvailableSlotsTag>
          </HeaderLabelContainer>
        );
      case 'live_item':
        return (
          <UserSessionCard
            session={item.session}
            type="live"
            onReservePress={handleReserve}
          />
        );
      case 'upcoming_header':
        return (
          <HeaderLabelContainer style={{ marginTop: verticalScale(8) }}>
            <SectionTitle variant="headline_md" color="on_surface">
              {t('user.home_booking_status.upcoming_sessions') || 'Upcoming Sessions'}
            </SectionTitle>
          </HeaderLabelContainer>
        );
      case 'upcoming_item':
        return (
          <UserSessionCard
            session={item.session}
            type="upcoming"
          />
        );
      case 'footer':
        return (
          <GridContainer>
            <AsymmetricGridCard onPress={handleViewAllPress}>
              <MoreHorizontal color={theme.colors.primary_container as string} size={scale(32)} />
              <GridLabel variant="label_caps" color="on_surface_variant">
                {t('user.home_booking_status.view_all')}
              </GridLabel>
            </AsymmetricGridCard>
          </GridContainer>
        );
      default:
        return null;
    }
  }, [handleReserve, handleViewAllPress, t, theme.colors.primary_container]);

  const renderAvailableState = () => {
    if (listData.length === 0) return null;

    return (
      <ListContainer style={{ flex: 1 }}>
        <FlashList
          data={listData}
          renderItem={renderItem}
          estimatedItemSize={120}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderWelcomeSection()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(100), paddingHorizontal: scale(16) }}
        />
      </ListContainer>
    );
  };

  const renderEmptyState = () => {
    return (
      <EmptyStateContainer>
        <EmptyStateIconCircle>
          <AlertTriangle color={theme.colors.outline as string} size={scale(36)} />
        </EmptyStateIconCircle>
        <EmptyStateTitle variant="headline_md" color="on_surface">
          {t('user.home_booking_status.no_active_bookings')}
        </EmptyStateTitle>
        <EmptyStateDesc variant="body_sm" color="on_surface_variant">
          {t('user.home_booking_status.empty_desc')}
        </EmptyStateDesc>
        <NotifyButton onPress={handleNotifyPress}>
          <NotifyButtonText variant="label_caps" color="primary">
            {t('user.home_booking_status.notify_me')}
          </NotifyButtonText>
        </NotifyButton>
      </EmptyStateContainer>
    );
  };

  return (
    <ScreenContainer>
      <AppLayoutTemplate
        headerTitle={t('common.app_name')}
        role="user"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrollable={false}
      >
        {isFetching && liveSessions.length === 0 && upcomingSessions.length === 0 ? (
          <>
            {renderWelcomeSection()}
            <LoadingOverlay>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </LoadingOverlay>
          </>
        ) : mode === 'available' && listData.length > 0 ? (
          renderAvailableState()
        ) : (
          <>
            {renderWelcomeSection()}
            {renderEmptyState()}
          </>
        )}
      </AppLayoutTemplate>
    </ScreenContainer>
  );
});

HomeBookingStatus.displayName = 'HomeBookingStatus';
