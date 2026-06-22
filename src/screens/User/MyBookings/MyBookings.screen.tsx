import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useMyBookings } from './useMyBookings';
import {
  ScreenContainer,
  SectionContainer,
  HeaderLabelContainer,
  StatusTag,
  ConfirmedStatusText,
  ActiveCard,
  ActiveImageContainer,
  CardBannerImage,
  CardContentBody,
  ContentSplitRow,
  DetailsGrid,
  GridRow,
  GridCol,
  DetailsLabelText,
  DetailsValueText,
  LocationRow,
  LocationText,
  QRWrapper,
  QRCodeImage,
  ScanText,
  ActionButtonsWrapper,
  StyledButton,
  SuccessBanner,
  SuccessBannerText,
  EmptyStateWrapper,
  EmptyIconCircle,
  EmptyStateTitle,
  EmptyStateDesc,
  LoadingOverlay,
  GradientOverlay,
  OverlayTagText,
  OverlayTitleText,
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
    handleTabChange,
  } = useMyBookings();

  const renderActiveBooking = () => {
    if (!activeBooking) {
      return (
        <EmptyStateWrapper>
          <EmptyIconCircle>
            <Calendar color={theme.colors.outline as string} size={scale(28)} />
          </EmptyIconCircle>
          <EmptyStateTitle variant="headline_md" color="on_surface">
            {t('user.my_bookings.no_active_booking')}
          </EmptyStateTitle>
          <EmptyStateDesc variant="body_sm" color="on_surface_variant">
            {t('user.my_bookings.empty_desc')}
          </EmptyStateDesc>
        </EmptyStateWrapper>
      );
    }

    return (
      <ActiveCard>
        <ActiveImageContainer>
          {activeBooking.imageUrl ? <CardBannerImage source={{ uri: activeBooking.imageUrl }} /> : null}
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.7)']}>
            <OverlayTagText variant="label_caps">
              {t('user.my_bookings.session_today')}
            </OverlayTagText>
            <OverlayTitleText variant="headline_md">
              {activeBooking.title}
            </OverlayTitleText>
          </GradientOverlay>
        </ActiveImageContainer>
        <CardContentBody>
          <ContentSplitRow>
            <DetailsGrid>
              <GridRow>
                <GridCol>
                  <DetailsLabelText variant="label_caps" color="on_surface_variant">
                    {t('user.my_bookings.time')}
                  </DetailsLabelText>
                  <DetailsValueText variant="body_lg" color="on_surface">
                    {activeBooking.time}
                  </DetailsValueText>
                </GridCol>
                <GridCol>
                  <DetailsLabelText variant="label_caps" color="on_surface_variant">
                    {t('user.booking_successful.booking_id_label') || 'Booking ID'}
                  </DetailsLabelText>
                  <DetailsValueText variant="body_lg" color="on_surface" numberOfLines={1} ellipsizeMode="tail">
                    {activeBooking.id}
                  </DetailsValueText>
                </GridCol>
              </GridRow>
              <LocationRow>
                <MapPin color={theme.colors.primary as string} size={scale(18)} />
                <LocationText variant="body_sm" color="primary">
                  {activeBooking.location}
                </LocationText>
              </LocationRow>
            </DetailsGrid>
            {activeBooking.qrCodeUrl ? (
              <QRWrapper>
                <QRCodeImage source={{ uri: activeBooking.qrCodeUrl }} />
                <ScanText>{t('user.my_bookings.scan_at_entry')}</ScanText>
              </QRWrapper>
            ) : null}
          </ContentSplitRow>
        </CardContentBody>
        <ActionButtonsWrapper>
          <StyledButton
            label={t('user.my_bookings.get_directions')}
            onPress={handleDirectionsPress}
            variant="primary"
            fullWidth
          />
          <StyledButton
            label={t('user.my_bookings.cancel_booking')}
            onPress={handleCancelPress}
            variant="outline"
            fullWidth
          />
        </ActionButtonsWrapper>
      </ActiveCard>
    );
  };

  return (
    <ScreenContainer>
      <AppLayoutTemplate
        headerTitle="MaharajJi"
        role="user"
        activeTab="bookings"
        onTabChange={handleTabChange}
      >
        {successMessage ? (
          <SuccessBanner>
            <CheckCircle2 color="#2E7D32" size={scale(20)} />
            <SuccessBannerText variant="body_sm">
              {t('user.my_bookings.cancel_success')}
            </SuccessBannerText>
          </SuccessBanner>
        ) : null}

        <SectionContainer>
          <HeaderLabelContainer>
            <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
              {t('user.my_bookings.active_session')}
            </Typography>
            {activeBooking ? (
              <StatusTag isConfirmed>
                <ConfirmedStatusText variant="label_caps">
                  {t('user.my_bookings.status_confirmed')}
                </ConfirmedStatusText>
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
      </AppLayoutTemplate>

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
