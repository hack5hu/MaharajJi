import React, { useState } from 'react';
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
} from './HomeBookingStatus.styles';

export const HomeBookingStatus = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'history' | 'profile'>('home');

  const {
    mode,
    toggleMode,
    activeSession,
    handleReservePress,
    handleNotifyPress,
    handleViewAllPress,
    handleMenuPress,
  } = useHomeBookingStatus();

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    console.log('Switch to customer tab: ', tab);
  };

  const renderAvailableState = () => {
    const progress = activeSession.slotsLeft / activeSession.totalSlots;

    return (
      <Box style={{ flex: 1 }}>
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

        {/* Bento Primary Session Card */}
        <BentoCardContainer>
          <Box>
            <CardBannerImage source={{ uri: activeSession.imageUrl }} />
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
                {t('user.home_booking_status.coming_up')}
              </Typography>
              <Typography variant="headline_md" style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
                {activeSession.title}
              </Typography>
            </LinearGradient>
          </Box>

          <CardContentBody>
            <RowContainer>
              <DetailsSubRow>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                  <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
                  <Typography variant="body_sm" color="on_surface_variant">
                    {activeSession.date}
                  </Typography>
                </Box>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                  <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                  <Typography variant="body_sm" color="on_surface_variant">
                    {activeSession.time}
                  </Typography>
                </Box>
              </DetailsSubRow>

              <Typography variant="label_caps" color="primary" style={{ fontWeight: '700' }}>
                {t('user.home_booking_status.slots_left', { count: activeSession.slotsLeft })}
              </Typography>
            </RowContainer>

            {/* Slots utilization progress bar */}
            <ProgressTrack>
              <ProgressFill progress={progress} />
            </ProgressTrack>

            <Button
              label={t('user.home_booking_status.reserve_seat')}
              onPress={handleReservePress}
              variant="primary"
              fullWidth
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: theme.rounded.lg,
                paddingVertical: verticalScale(14),
              }}
            />
          </CardContentBody>
        </BentoCardContainer>

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

        {mode === 'available' ? renderAvailableState() : renderEmptyState()}
      </HomeBookingStatusTemplate>

      {/* Mode State Switcher for Visual Testing */}
      <ToggleFloatingButton onPress={toggleMode}>
        <RefreshCw color={theme.colors.on_secondary_container as string} size={scale(20)} />
      </ToggleFloatingButton>
    </ScreenContainer>
  );
});

HomeBookingStatus.displayName = 'HomeBookingStatus';
