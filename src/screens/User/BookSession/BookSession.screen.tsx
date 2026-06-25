import React from 'react';
import { useTheme } from 'styled-components/native';
import { Calendar, Clock, Minus, Plus, AlertCircle } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { BookSessionTemplate } from '@/components/templates/BookSessionTemplate';
import { useBookSession } from './useBookSession';
import {
  ScreenContainer,
  SessionCard,
  CardBannerImage,
  SessionCardBody,
  DetailItem,
  CounterSection,
  CounterRow,
  CounterControls,
  CircularButton,
  DisclaimerBox,
  PageTitle,
  SessionTitle,
  SlotsText,
  CounterTextGroup,
  SelectSeatsTitle,
  SelectSeatsDesc,
  CounterNumber,
  DisclaimerText,
  BookSessionDateBadge,
  BookSessionWindowContainer,
  BookSessionWindowLabel,
  StickyFooterRow,
  FooterActionButtonWrapper,
  GradientButtonContainer,
  ConfirmButton,
  ErrorBanner,
  ErrorBannerText,
  SessionOnText,
} from './BookSession.styles';

export const BookSession = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const {
    seats,
    maxSeats,
    errorMessage,
    handleIncrement,
    handleDecrement,
    handleConfirm,
    handleBack,
    session,
    isLoading,
  } = useBookSession();

  return (
    <ScreenContainer>
      <BookSessionTemplate
        onBackPress={handleBack}
        footer={
          <StickyFooterRow style={{ flexDirection: 'column', gap: scale(16) }}>
            {errorMessage ? (
              <ErrorBanner style={{ marginBottom: 0 }}>
                <AlertCircle color="#C62828" size={scale(20)} />
                <ErrorBannerText variant="body_sm">
                  {errorMessage}
                </ErrorBannerText>
              </ErrorBanner>
            ) : null}
            <FooterActionButtonWrapper style={{ width: '100%' }}>
              <GradientButtonContainer
                colors={isLoading ? [theme.colors.surface_dim, theme.colors.surface_dim] : [theme.colors.primary, theme.colors.primary_container]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ConfirmButton
                  label={t('user.book_session.confirm_btn')}
                  onPress={handleConfirm}
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                />
              </GradientButtonContainer>
            </FooterActionButtonWrapper>
          </StickyFooterRow>
        }
      >
        <PageTitle variant="headline_lg" color="on_surface">
          {t('user.book_session.title')}
        </PageTitle>
 
        {/* Session Card */}
        <SessionCard>
          {session?.imageUrl ? (
            <CardBannerImage source={{ uri: session.imageUrl }} />
          ) : null}
          <SessionCardBody>
            <SessionTitle variant="headline_md" color="on_surface">
              {session?.sessionTitle || ''}
            </SessionTitle>
 
            <BookSessionDateBadge>
              <Calendar color={theme.colors.on_primary_container as string} size={scale(16)} />
              <SessionOnText variant="label_caps" color="on_primary_container">
                {t('user.home_booking_status.session_on')}: {session?.date || ''}
              </SessionOnText>
            </BookSessionDateBadge>

            <BookSessionWindowContainer>
              <BookSessionWindowLabel variant="label_caps" color="on_surface_variant">
                {t('user.home_booking_status.booking_window')}
              </BookSessionWindowLabel>
              <DetailItem>
                <Clock color={theme.colors.on_surface_variant as string} size={scale(14)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {session?.time || ''}
                </Typography>
              </DetailItem>
            </BookSessionWindowContainer>

            <SlotsText variant="body_sm" color="primary">
              {t('user.home_booking_status.slots_left', { count: session?.slotsLeft || 0 })}
            </SlotsText>
          </SessionCardBody>
        </SessionCard>

        <CounterSection>
          <CounterRow>
            <CounterTextGroup>
              <SelectSeatsTitle variant="body_lg" color="on_surface">
                {t('user.book_session.select_seats')}
              </SelectSeatsTitle>
              <SelectSeatsDesc variant="body_sm" color="on_surface_variant">
                {t('user.book_session.choose_desc', { max: maxSeats })}
              </SelectSeatsDesc>
            </CounterTextGroup>

            <CounterControls>
              <CircularButton
                onPress={handleDecrement}
                disabled={seats <= 1 || isLoading}
              >
                <Minus
                  color={(seats <= 1 || isLoading ? theme.colors.outline : theme.colors.primary) as string}
                  size={scale(20)}
                />
              </CircularButton>

              <CounterNumber variant="headline_md" color="on_surface">
                {seats}
              </CounterNumber>

              <CircularButton
                onPress={handleIncrement}
                disabled={seats >= maxSeats || isLoading}
              >
                <Plus
                  color={(seats >= maxSeats || isLoading ? theme.colors.outline : theme.colors.primary) as string}
                  size={scale(20)}
                />
              </CircularButton>
            </CounterControls>
          </CounterRow>
        </CounterSection>

        {/* Disclaimer */}
        <DisclaimerBox>
          <DisclaimerText variant="body_sm" color="on_surface_variant">
            {t('user.book_session.disclaimer')}
          </DisclaimerText>
        </DisclaimerBox>
      </BookSessionTemplate>
    </ScreenContainer>
  );
});

BookSession.displayName = 'BookSession';
