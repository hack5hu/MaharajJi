import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { AlertTriangle, MoreHorizontal } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { HomeBookingStatusTemplate } from '@/components/templates/HomeBookingStatusTemplate';
import { useHomeBookingStatus } from './useHomeBookingStatus';
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

  const {
    mode,
    isFetching,
    liveSessions,
    upcomingSessions,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
    handleMenuPress,
  } = useHomeBookingStatus();

  const navigation = useAppNavigation();

  const handleTabChange = useCallback((tab: 'home' | 'bookings' | 'history' | 'profile') => {
    setActiveTab(tab);
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

  const renderAvailableState = () => {
    if (liveSessions.length === 0 && upcomingSessions.length === 0) return null;

    return (
      <ListContainer>
        {liveSessions.length > 0 && (
          <>
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
            
            {liveSessions.map((session: UserSession) => (
              <UserSessionCard
                key={session.id}
                session={session}
                type="live"
                onReservePress={handleReserve}
              />
            ))}
          </>
        )}

        {upcomingSessions.length > 0 && (
          <>
            <HeaderLabelContainer style={{ marginTop: verticalScale(8) }}>
              <SectionTitle variant="headline_md" color="on_surface">
                {t('user.home_booking_status.upcoming_sessions') || 'Upcoming Sessions'}
              </SectionTitle>
            </HeaderLabelContainer>
            
            {upcomingSessions.map((session: UserSession) => (
              <UserSessionCard
                key={session.id}
                session={session}
                type="upcoming"
              />
            ))}
          </>
        )}

        {/* Asymmetric Grid */}
        <GridContainer>
          <AsymmetricGridCard onPress={handleViewAllPress}>
            <MoreHorizontal color={theme.colors.primary_container as string} size={scale(32)} />
            <GridLabel variant="label_caps" color="on_surface_variant">
              {t('user.home_booking_status.view_all')}
            </GridLabel>
          </AsymmetricGridCard>
        </GridContainer>
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
      <HomeBookingStatusTemplate
        headerTitle="Sacred Spaces"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Zgwf2YtZKTGT-ftE3Y8GCAzU-nxvKaWAyEqKxcIzAxcdA-qebz1eIqbuscjt-SeC5H5vKCmNnQtdFdTorLCQpEq-ygKuOFSsIPc7UYRUCeXUVvyd2DRRZLn-w5nyM9tCZqX5d4Y0ooDR6bM4jkHn4uzL6XCp_Utggmb1YR4nhKna8ckn5hukC46LjZgGZkkRmuPmqXSaRP1ri7DTcURSLXHlRlDMzz1YGGcCF2yWUSwhegWo8xgBUgprZf-yE16mzQ72aNF5B6g"
        onMenuPress={handleMenuPress}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      >
        {/* Welcome Section */}
        <WelcomeSection>
          <WelcomeTitle variant="headline_lg_mobile" color="on_surface">
            {t('user.home_booking_status.welcome')}
          </WelcomeTitle>
          <WelcomeSubtitle variant="body_sm">
            {t('user.home_booking_status.subtitle')}
          </WelcomeSubtitle>
        </WelcomeSection>

        {isFetching && liveSessions.length === 0 && upcomingSessions.length === 0 ? (
          <LoadingOverlay>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadingOverlay>
        ) : mode === 'available' ? (
          renderAvailableState()
        ) : (
          renderEmptyState()
        )}
      </HomeBookingStatusTemplate>
    </ScreenContainer>
  );
});

HomeBookingStatus.displayName = 'HomeBookingStatus';
