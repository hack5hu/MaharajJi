import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MapPin, Calendar, CheckCircle2, Sparkles, Music, Flame, BookOpen, History as HistoryIcon } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale, moderateScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { AppLayoutTemplate } from '@/components/templates/AppLayoutTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { FlashList } from '@shopify/flash-list';
import { BookingStatus } from '@/constants/enums';
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
  HistoryList,
  HistoryCard,
  HistoryLeft,
  HistoryIconContainer,
  HistoryTextInfo,
  HistoryBadge,
  LoadMoreBtn,
} from './MyBookings.styles';
import { Box } from '@/components/atoms/Box';

export const MyBookings = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const {
    activeBookings,
    pastBookings,
    showCancelModal,
    cancelling,
    successMessage,
    bookingToCancel,
    isLoading,
    isFetchingMore,
    loadMoreBookings,
    handleCancelPress,
    handleConfirmCancel,
    handleDismissCancel,
    handleTabChange,
  } = useMyBookings();

  const getCategoryIcon = (category: string, color: string, size: number) => {
    switch (category) {
      case 'self_improvement': return <Sparkles color={color} size={size} />;
      case 'spa': return <Music color={color} size={size} />;
      case 'church': return <Flame color={color} size={size} />;
      case 'temple_hindu': return <BookOpen color={color} size={size} />;
      default: return <Sparkles color={color} size={size} />;
    }
  };

  const renderActiveBookings = useCallback(() => {
    if (activeBookings.length === 0) {
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

    return activeBookings.map((activeBooking) => (
      <ActiveCard key={activeBooking.id} style={{ marginBottom: scale(16) }}>
        <ActiveImageContainer>
          {activeBooking.imageUrl ? <CardBannerImage source={{ uri: activeBooking.imageUrl }} /> : null}
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.7)']}>
            <OverlayTagText variant="label_caps">
              {activeBooking.comingUpLabel === 'LIVE' ? t('user.my_bookings.session_today') : t('user.my_bookings.upcoming')}
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
                    {t('user.my_bookings.date')}
                  </DetailsLabelText>
                  <DetailsValueText variant="body_lg" color="on_surface">
                    {activeBooking.date}
                  </DetailsValueText>
                </GridCol>
                <GridCol>
                  <DetailsLabelText variant="label_caps" color="on_surface_variant">
                    {t('user.my_bookings.token_number')}
                  </DetailsLabelText>
                  <DetailsValueText variant="body_lg" color="on_surface">
                    #{activeBooking.tokenNumber}
                  </DetailsValueText>
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol>
                  <DetailsLabelText variant="label_caps" color="on_surface_variant">
                    {t('user.my_bookings.total_people')}
                  </DetailsLabelText>
                  <DetailsValueText variant="body_lg" color="on_surface" numberOfLines={1} ellipsizeMode="tail">
                    {activeBooking.numberOfPeople}
                  </DetailsValueText>
                </GridCol>
                <GridCol />
              </GridRow>
              <LocationRow>
                <MapPin color={theme.colors.primary as string} size={scale(18)} />
                <LocationText variant="body_sm" color="primary">
                  {activeBooking.location}
                </LocationText>
              </LocationRow>
            </DetailsGrid>
          </ContentSplitRow>
        </CardContentBody>
        <ActionButtonsWrapper>
          <StyledButton
            label={t('user.my_bookings.cancel_booking')}
            onPress={() => handleCancelPress(activeBooking.id)}
            variant="outline"
            fullWidth
          />
        </ActionButtonsWrapper>
      </ActiveCard>
    ));
  }, [activeBookings, theme, t, handleCancelPress]);

  const renderHistoryItem = useCallback(({ item }: any) => {
    const isCompleted = item.status === BookingStatus.COMPLETED;
    const statusColor = isCompleted ? theme.colors.on_surface_variant : theme.colors.error;
    const badgeLabel = isCompleted
      ? t('user.my_bookings.status_completed')
      : t('user.my_bookings.status_cancelled');

    return (
      <HistoryCard>
        <HistoryLeft>
          <HistoryIconContainer>
            {getCategoryIcon(item.category, theme.colors.primary as string, scale(20))}
          </HistoryIconContainer>
          <HistoryTextInfo>
            <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
              {item.title}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant">
              {item.date}
            </Typography>
          </HistoryTextInfo>
        </HistoryLeft>
        <HistoryBadge isCompleted={isCompleted}>
          <Typography variant="label_caps" style={{ color: statusColor, fontWeight: '700', textTransform: 'none' }}>
            {badgeLabel}
          </Typography>
        </HistoryBadge>
      </HistoryCard>
    );
  }, [theme, t]);

  const renderListHeader = useCallback(() => (
    <>
      <SectionContainer>
        <HeaderLabelContainer>
          <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
            {t('user.my_bookings.active_session')}
          </Typography>
          {activeBookings.length > 0 ? (
            <StatusTag isConfirmed>
              <ConfirmedStatusText variant="label_caps">
                {activeBookings.length} {t('user.my_bookings.status_confirmed')}
              </ConfirmedStatusText>
            </StatusTag>
          ) : null}
        </HeaderLabelContainer>

        {isLoading ? (
          <LoadingOverlay>
            <ActivityIndicator size="large" color={theme.colors.primary as string} />
          </LoadingOverlay>
        ) : (
          renderActiveBookings()
        )}
      </SectionContainer>
      
      {pastBookings.length > 0 && (
        <HeaderLabelContainer style={{ marginTop: scale(16) }}>
          <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
            {t('user.my_bookings.past_bookings') || 'Past Bookings'}
          </Typography>
        </HeaderLabelContainer>
      )}
    </>
  ), [activeBookings, pastBookings, isLoading, theme, t, renderActiveBookings]);

  const renderListFooter = useCallback(() => {
    if (isFetchingMore) {
      return (
        <LoadingOverlay>
          <ActivityIndicator size="small" color={theme.colors.primary as string} />
        </LoadingOverlay>
      );
    }
    return null;
  }, [isFetchingMore, theme]);

  return (
    <ScreenContainer>
      <AppLayoutTemplate
        headerTitle="MaharajJi"
        role="user"
        activeTab="bookings"
        onTabChange={handleTabChange}
        scrollable={false}
      >
        {successMessage ? (
          <SuccessBanner>
            <CheckCircle2 color="#2E7D32" size={scale(20)} />
            <SuccessBannerText variant="body_sm">
              {t('user.my_bookings.cancel_success')}
            </SuccessBannerText>
          </SuccessBanner>
        ) : null}

        <FlashList
          data={pastBookings}
          renderItem={renderHistoryItem}
          estimatedItemSize={moderateScale(80)}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
          onEndReached={loadMoreBookings}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: scale(16), paddingBottom: scale(120) }}
          ItemSeparatorComponent={() => <Box style={{ height: scale(12) }} />}
        />
      </AppLayoutTemplate>

      <ConfirmationModal
        visible={showCancelModal}
        title={t('user.my_bookings.cancel_confirm_title')}
        message={t('user.my_bookings.cancel_confirm_msg', { session: activeBookings.find(b => b.id === bookingToCancel)?.title || '' })}
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
