import React from 'react';
import { useTheme } from 'styled-components/native';
import { Calendar, Clock, Minus, Plus } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
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
  DisclaimerBox,
  ButtonWrapper,
  PageTitle,
  SessionTitle,
  SlotsText,
  CounterTextGroup,
  SelectSeatsTitle,
  SelectSeatsDesc,
  CounterNumber,
  DisclaimerText,
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
            <SessionTitle variant="headline_md" color="on_surface">
              {session?.sessionTitle || ''}
            </SessionTitle>

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
                disabled={seats <= 1}
              >
                <Minus
                  color={(seats <= 1 ? theme.colors.outline : theme.colors.primary) as string}
                  size={scale(20)}
                />
              </CircularButton>

              <CounterNumber variant="headline_md" color="on_surface">
                {seats}
              </CounterNumber>

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
          <DisclaimerText variant="body_sm" color="on_surface_variant">
            {t('user.book_session.disclaimer')}
          </DisclaimerText>
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
