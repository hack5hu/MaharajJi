import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { Calendar, Clock, RefreshCw, AlertTriangle, Eye, Sparkles, MoreHorizontal } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { HomeBookingStatusTemplate } from '@/components/templates/HomeBookingStatusTemplate';
import { useHomeBookingStatus } from './useHomeBookingStatus';
import {
  ScreenContainer,
  WelcomeSection,
  HeaderLabelContainer,
  AvailableSlotsTag,
  BentoCardContainer,
  CardBannerImage,
  CardImageOverlay,
  CardContentBody,
  RowContainer,
  DetailsSubRow,
  ProgressTrack,
  ProgressFill,
  GridContainer,
  AsymmetricGridCard,
  EmptyStateContainer,
  EmptyStateIconCircle,
  NotifyButton,
  ToggleFloatingButton,
  LoadingOverlay,
} from './HomeBookingStatus.styles';

export const HomeBookingStatus = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'history' | 'profile'>('home');

  const {
    mode,
    isFetching,
    toggleMode,
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

  const renderSessionCard = (session: any, type: 'live' | 'upcoming') => {
    const progress = session.totalSlots > 0 ? session.slotsLeft / session.totalSlots : 0;
    
    return (
      <BentoCardContainer key={session.id} style={{ marginBottom: verticalScale(16) }}>
        <Box>
          <CardBannerImage source={{ uri: session.imageUrl }} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: verticalScale(100),
              justifyContent: 'flex-end',
              padding: scale(16),
            }}
          >
            <Typography variant="label_caps" style={{ color: '#fff', opacity: 0.9 }}>
              {type === 'live' ? t('user.home_booking_status.coming_up') : 'UPCOMING SESSION'}
            </Typography>
            <Typography variant="headline_md" style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
              {session.title}
            </Typography>
          </LinearGradient>
        </Box>

        <CardContentBody>
          <RowContainer style={{ alignItems: 'flex-start' }}>
            <Box style={{ flex: 1, gap: scale(6) }}>
              <DetailsSubRow>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                  <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
                  <Typography variant="body_sm" color="on_surface_variant">
                    {t('admin.manage_sessions.session_date') || 'Session'}: {session.sessionDate}
                  </Typography>
                </Box>
              </DetailsSubRow>

              {type === 'upcoming' && (
                <>
                  <DetailsSubRow>
                    <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                      <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
                      <Typography variant="body_sm" color="on_surface_variant">
                        {t('admin.manage_sessions.booking_date') || 'Booking'}: {session.bookingOpenDate}
                      </Typography>
                    </Box>
                  </DetailsSubRow>
                  <DetailsSubRow>
                    <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                      <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                      <Typography variant="body_sm" color="on_surface_variant">
                        {(session.bookingOpenTime && session.bookingCloseTime) ? `${session.bookingOpenTime} - ${session.bookingCloseTime}` : 'All Day'}
                      </Typography>
                    </Box>
                  </DetailsSubRow>
                </>
              )}

              {type === 'live' && (
                <DetailsSubRow>
                  <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                    <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                    <Typography variant="body_sm" color="on_surface_variant">
                      {(session.bookingOpenTime && session.bookingCloseTime) ? `${session.bookingOpenTime} - ${session.bookingCloseTime}` : 'All Day'}
                    </Typography>
                  </Box>
                </DetailsSubRow>
              )}
            </Box>

            {type === 'live' && (
              <Typography variant="label_caps" color="primary" style={{ fontWeight: '700', marginLeft: scale(8) }}>
                {t('user.home_booking_status.slots_left', { count: session.slotsLeft })}
              </Typography>
            )}
          </RowContainer>

          {type === 'live' && (
            <>
              {/* Slots utilization progress bar */}
              <ProgressTrack style={{ marginTop: verticalScale(12) }}>
                <ProgressFill progress={progress} />
              </ProgressTrack>

              <Button
                label={t('user.home_booking_status.reserve_seat')}
                onPress={() => handleReservePress(session)}
                variant="primary"
                fullWidth
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.rounded.lg,
                  paddingVertical: verticalScale(14),
                  marginTop: verticalScale(16),
                }}
              />
            </>
          )}
        </CardContentBody>
      </BentoCardContainer>
    );
  };

  const renderAvailableState = () => {
    if (liveSessions.length === 0 && upcomingSessions.length === 0) return null;

    return (
      <Box style={{ flex: 1 }}>
        {liveSessions.length > 0 && (
          <>
            <HeaderLabelContainer>
              <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
                {t('user.home_booking_status.available_sessions')}
              </Typography>
              <AvailableSlotsTag>
                <Typography variant="label_caps" color="on_primary_container" style={{ textTransform: 'none', fontWeight: '700' }}>
                  {t('user.home_booking_status.booking_open')}
                </Typography>
              </AvailableSlotsTag>
            </HeaderLabelContainer>
            
            {liveSessions.map((session: any) => renderSessionCard(session, 'live'))}
          </>
        )}

        {upcomingSessions.length > 0 && (
          <>
            <HeaderLabelContainer style={{ marginTop: verticalScale(8) }}>
              <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
                {t('user.home_booking_status.upcoming_sessions') || 'Upcoming Sessions'}
              </Typography>
            </HeaderLabelContainer>
            
            {upcomingSessions.map((session: any) => renderSessionCard(session, 'upcoming'))}
          </>
        )}

        {/* Asymmetric Grid */}
        <GridContainer>
          <AsymmetricGridCard onPress={handleViewAllPress}>
            <MoreHorizontal color={theme.colors.primary_container as string} size={scale(32)} />
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
              {t('user.home_booking_status.view_all')}
            </Typography>
          </AsymmetricGridCard>
        </GridContainer>
      </Box>
    );
  };

  const renderEmptyState = () => {
    return (
      <EmptyStateContainer>
        <EmptyStateIconCircle>
          <AlertTriangle color={theme.colors.outline as string} size={scale(36)} />
        </EmptyStateIconCircle>
        <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
          {t('user.home_booking_status.no_active_bookings')}
        </Typography>
        <Typography variant="body_sm" color="on_surface_variant" style={{ textAlign: 'center', lineHeight: 20 }}>
          {t('user.home_booking_status.empty_desc')}
        </Typography>
        <NotifyButton onPress={handleNotifyPress}>
          <Typography variant="label_caps" color="primary" style={{ fontWeight: '700', paddingBottom: scale(2) }}>
            {t('user.home_booking_status.notify_me')}
          </Typography>
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
          <Typography variant="headline_lg_mobile" color="on_surface" style={{ fontWeight: '700' }}>
            {t('user.home_booking_status.welcome')}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant">
            {t('user.home_booking_status.subtitle')}
          </Typography>
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
