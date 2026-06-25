import React, { useMemo, useCallback } from 'react';
import { Calendar, Clock } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { UserSessionCardProps } from './types.d';
import {
  BentoCardContainer,
  CardBannerImage,
  GradientOverlay,
  OverlayTagText,
  OverlayTitleText,
  CardContentBody,
  RowContainer,
  CardDetailsCol,
  DetailsSubRow,
  SlotsText,
  ProgressTrack,
  ProgressFill,
  ActionButtonWrapper,
  BookingWindowContainer,
  BookingWindowLabel,
  SessionDateBadge,
  LiveInfoText,
  GradientButtonContainer,
  ConfirmButton,
} from './UserSessionCard.styles';

export const UserSessionCard = React.memo(
  ({ session, type, onReservePress }: UserSessionCardProps) => {
    const theme = useTheme() as ThemeType;
    const { t } = useLocale();

    const progress = useMemo(() => {
      if (session.totalSlots <= 0) return 0;
      return session.slotsLeft / session.totalSlots;
    }, [session.slotsLeft, session.totalSlots]);

    const handlePress = useCallback(() => {
      onReservePress?.(session);
    }, [onReservePress, session]);

    const formattedTime = useMemo(() => {
      if (session.bookingOpenTime && session.bookingCloseTime) {
        return `${session.bookingOpenTime} - ${session.bookingCloseTime}`;
      }
      return t('user.my_bookings.all_day', { defaultValue: 'All Day' });
    }, [session.bookingOpenTime, session.bookingCloseTime, t]);

    const overlayTagLabel = useMemo(() => {
      return type === 'live'
        ? t('user.home_booking_status.coming_up')
        : t('user.home_booking_status.upcoming_sessions_tag', {
            defaultValue: 'UPCOMING SESSION',
          });
    }, [type, t]);

    return (
      <BentoCardContainer>
        <Box>
          {session.imageUrl ? (
            <CardBannerImage source={{ uri: session.imageUrl }} />
          ) : null}
          <GradientOverlay colors={['transparent', 'rgba(0,0,0,0.7)']}>
            <OverlayTagText variant="label_caps">
              {overlayTagLabel}
            </OverlayTagText>
            <OverlayTitleText variant="headline_md">
              {session.title}
            </OverlayTitleText>
          </GradientOverlay>
        </Box>

        <CardContentBody>
          {/* Session Date — prominently displayed as badge */}
          <SessionDateBadge>
            <Calendar
              color={theme.colors.on_primary_container as string}
              size={scale(16)}
            />
            <Typography
              variant="label_caps"
              color="on_primary_container"
              style={{ fontWeight: '700' }}
            >
              {t('user.home_booking_status.session_on')}: {session.sessionDate}
            </Typography>
          </SessionDateBadge>

          {/* Booking Window — clearly labelled section */}
          <BookingWindowContainer>
            <BookingWindowLabel variant="label_caps" color="on_surface_variant">
              {t('user.home_booking_status.booking_window')}
            </BookingWindowLabel>
            <DetailsSubRow>
              <Calendar
                color={theme.colors.on_surface_variant as string}
                size={scale(14)}
              />
              <Typography variant="body_sm" color="on_surface_variant">
                {session.bookingOpenDate}
              </Typography>
            </DetailsSubRow>
            <DetailsSubRow>
              <Clock
                color={theme.colors.on_surface_variant as string}
                size={scale(14)}
              />
              <Typography variant="body_sm" color="on_surface_variant">
                {formattedTime}
              </Typography>
            </DetailsSubRow>
          </BookingWindowContainer>

          {type === 'live' && (
            <>
              <RowContainer>
                <LiveInfoText variant="body_sm" color="primary">
                  {t('user.home_booking_status.live_booking_info')}
                </LiveInfoText>
                <SlotsText variant="label_caps" color="primary">
                  {t('user.home_booking_status.slots_left', {
                    count: session.slotsLeft,
                  })}
                </SlotsText>
              </RowContainer>

              <ProgressTrack>
                <ProgressFill progress={progress} />
              </ProgressTrack>

              <ActionButtonWrapper>
                <GradientButtonContainer
                  colors={[
                    theme.colors.primary,
                    theme.colors.primary_container,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <ConfirmButton
                    label={t('user.home_booking_status.reserve_seat')}
                    onPress={handlePress}
                    variant="primary"
                    fullWidth
                  />
                </GradientButtonContainer>
              </ActionButtonWrapper>
            </>
          )}
        </CardContentBody>
      </BentoCardContainer>
    );
  },
);

UserSessionCard.displayName = 'UserSessionCard';
