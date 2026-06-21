import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { MyBookingsTemplate } from '@/components/templates/MyBookingsTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useMyBookings } from './useMyBookings';
import {
  ScreenContainer,
  SectionContainer,
  HeaderLabelContainer,
  StatusTag,
  ActiveCard,
  ActiveImageContainer,
  CardBannerImage,
  CardContentBody,
  ContentSplitRow,
  DetailsGrid,
  GridRow,
  GridCol,
  QRWrapper,
  QRCodeImage,
  ScanText,
  LocationRow,
  ActionButtonsWrapper,
  EmptyStateWrapper,
  EmptyIconCircle,
  LoadingOverlay,
} from './MyBookings.styles';

export const MyBookings = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const {
    activeBooking,
    showCancelModal,
    cancelling,
    successMessage,
    isLoading,
    handleCancelPress,
    handleConfirmCancel,
    handleDismissCancel,
    handleDirectionsPress,
    handleMenuPress,
    handleTabChange,
  } = useMyBookings();

  const renderActiveBooking = () => {
    if (!activeBooking) {
      return (
        <EmptyStateWrapper>
          <EmptyIconCircle>
            <Calendar color={theme.colors.outline as string} size={scale(28)} />
          </EmptyIconCircle>
          <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
            {t('user.my_bookings.no_active_booking')}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant" style={{ textAlign: 'center', lineHeight: 20 }}>
            {t('user.my_bookings.empty_desc')}
          </Typography>
        </EmptyStateWrapper>
      );
    }

    return (
      <ActiveCard>
        <ActiveImageContainer>
          <CardBannerImage source={{ uri: activeBooking.imageUrl }} />
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
              {t('user.my_bookings.session_today')}
            </Typography>
            <Typography variant="headline_md" style={{ color: '#fff', fontWeight: '700', fontSize: 20 }}>
              {activeBooking.title}
            </Typography>
          </LinearGradient>
        </ActiveImageContainer>
        <CardContentBody>
          <ContentSplitRow>
            <DetailsGrid>
              <GridRow>
                <GridCol>
                  <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700', marginBottom: 2 }}>
                    {t('user.my_bookings.time')}
                  </Typography>
                  <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '700' }}>
                    {activeBooking.time}
                  </Typography>
                </GridCol>
                <GridCol>
                  <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700', marginBottom: 2 }}>
                    {t('user.booking_successful.booking_id_label') || 'Booking ID'}
                  </Typography>
                  <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '700' }} numberOfLines={1} ellipsizeMode="tail">
                    {activeBooking.id}
                  </Typography>
                </GridCol>
              </GridRow>
              <LocationRow>
                <MapPin color={theme.colors.primary as string} size={scale(18)} />
                <Typography variant="body_sm" color="primary" style={{ fontWeight: '500', flex: 1 }}>
                  {activeBooking.location}
                </Typography>
              </LocationRow>
            </DetailsGrid>

            <QRWrapper>
              <QRCodeImage source={{ uri: activeBooking.qrCodeUrl }} />
              <ScanText>{t('user.my_bookings.scan_at_entry')}</ScanText>
            </QRWrapper>
          </ContentSplitRow>
        </CardContentBody>
        <ActionButtonsWrapper>
          <Button
            label={t('user.my_bookings.get_directions')}
            onPress={handleDirectionsPress}
            variant="primary"
            fullWidth
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
          <Button
            label={t('user.my_bookings.cancel_booking')}
            onPress={handleCancelPress}
            variant="outline"
            fullWidth
            style={{
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
        </ActionButtonsWrapper>
      </ActiveCard>
    );
  };

  return (
    <ScreenContainer>
      <MyBookingsTemplate
        headerTitle="Sacred Spaces"
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Zgwf2YtZKTGT-ftE3Y8GCAzU-nxvKaWAyEqKxcIzAxcdA-qebz1eIqbuscjt-SeC5H5vKCmNnQtdFdTorLCQpEq-ygKuOFSsIPc7UYRUCeXUVvyd2DRRZLn-w5nyM9tCZqX5d4Y0ooDR6bM4jkHn4uzL6XCp_Utggmb1YR4nhKna8ckn5hukC46LjZgGZkkRmuPmqXSaRP1ri7DTcURSLXHlRlDMzz1YGGcCF2yWUSwhegWo8xgBUgprZf-yE16mzQ72aNF5B6g"
        onMenuPress={handleMenuPress}
        activeTab="bookings"
        onTabChange={handleTabChange}
      >
        {successMessage ? (
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E8F5E9',
              paddingHorizontal: scale(16),
              paddingVertical: verticalScale(12),
              borderRadius: theme.rounded.md,
              marginBottom: verticalScale(16),
              gap: scale(10),
            }}
          >
            <CheckCircle2 color="#2E7D32" size={scale(20)} />
            <Typography variant="body_sm" style={{ color: '#2E7D32', fontWeight: '600', flex: 1 }}>
              {t('user.my_bookings.cancel_success')}
            </Typography>
          </Box>
        ) : null}

        <SectionContainer>
          <HeaderLabelContainer>
            <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
              {t('user.my_bookings.active_session')}
            </Typography>
            {activeBooking ? (
              <StatusTag isConfirmed>
                <Typography variant="label_caps" style={{ color: '#2E7D32', fontWeight: '700', textTransform: 'none' }}>
                  {t('user.my_bookings.status_confirmed')}
                </Typography>
              </StatusTag>
            ) : null}
          </HeaderLabelContainer>

          {isLoading && !activeBooking ? (
            <LoadingOverlay>
              <ActivityIndicator size="large" color={theme.colors.primary as string} />
            </LoadingOverlay>
          ) : (
            renderActiveBooking()
          )}
        </SectionContainer>
      </MyBookingsTemplate>

      <ConfirmationModal
        visible={showCancelModal}
        title={t('user.my_bookings.cancel_confirm_title')}
        message={t('user.my_bookings.cancel_confirm_msg', { session: activeBooking?.title || '' })}
        confirmLabel={t('user.my_bookings.cancel_confirm_ok')}
        cancelLabel={t('user.my_bookings.cancel_confirm_cancel')}
        onConfirm={handleConfirmCancel}
        onDismiss={handleDismissCancel}
        loading={cancelling}
      />
    </ScreenContainer>
  );
});

MyBookings.displayName = 'MyBookings';
