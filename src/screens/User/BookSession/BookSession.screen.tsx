import React from 'react';
import { useTheme } from 'styled-components/native';
import { Calendar, Clock, Minus, Plus } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { BookSessionTemplate } from '@/components/templates/BookSessionTemplate';
import { useBookSession } from './useBookSession';
import {
  ScreenContainer,
  SessionCard,
  CardBannerImage,
  SessionCardBody,
  DetailsRow,
  DetailItem,
  CounterSection,
  CounterRow,
  CounterControls,
  CircularButton,
  TokensBox,
  DisclaimerBox,
  ButtonWrapper,
  PageTitle,
} from './BookSession.styles';

export const BookSession = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  const {
    seats,
    maxSeats,
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
            <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
              {session?.sessionTitle || ''}
            </Typography>

            <DetailsRow>
              <DetailItem>
                <Calendar color={theme.colors.primary as string} size={scale(16)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {session?.date || ''}
                </Typography>
              </DetailItem>

              <DetailItem>
                <Clock color={theme.colors.primary as string} size={scale(16)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {session?.time || ''}
                </Typography>
              </DetailItem>
            </DetailsRow>

            <Typography variant="body_sm" color="primary" style={{ fontWeight: '600' }}>
              {t('user.home_booking_status.slots_left', { count: session?.slotsLeft || 0 })}
            </Typography>
          </SessionCardBody>
        </SessionCard>

        {/* Counter Section */}
        <CounterSection>
          <CounterRow>
            <Box style={{ flex: 1, marginRight: scale(16) }}>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {t('user.book_session.select_seats')}
              </Typography>
              <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: scale(2) }}>
                {t('user.book_session.choose_desc', { max: maxSeats })}
              </Typography>
            </Box>

            <CounterControls>
              <CircularButton
                onPress={handleDecrement}
                disabled={seats <= 1}
              >
                <Minus
                  color={(seats <= 1 ? theme.colors.outline : theme.colors.primary) as string}
                  size={scale(20)}
                />
              </CircularButton>

              <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700', minWidth: scale(24), textAlign: 'center' }}>
                {seats}
              </Typography>

              <CircularButton
                onPress={handleIncrement}
                disabled={seats >= maxSeats}
              >
                <Plus
                  color={(seats >= maxSeats ? theme.colors.outline : theme.colors.primary) as string}
                  size={scale(20)}
                />
              </CircularButton>
            </CounterControls>
          </CounterRow>
        </CounterSection>

        {/* Disclaimer */}
        <DisclaimerBox>
          <Typography variant="body_sm" color="on_surface_variant" style={{ fontStyle: 'italic', textAlign: 'center' }}>
            {t('user.book_session.disclaimer')}
          </Typography>
        </DisclaimerBox>

        {/* Confirmation Button */}
        <ButtonWrapper>
          <Button
            label={t('user.book_session.confirm_btn')}
            onPress={handleConfirm}
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          />
        </ButtonWrapper>
      </BookSessionTemplate>
    </ScreenContainer>
  );
});

BookSession.displayName = 'BookSession';
