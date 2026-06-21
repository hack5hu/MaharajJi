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
} from './UserSessionCard.styles';

export const UserSessionCard = React.memo(({
  session,
  type,
  onReservePress,
}: UserSessionCardProps) => {
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
      : t('user.home_booking_status.upcoming_sessions_tag', { defaultValue: 'UPCOMING SESSION' });
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
        <RowContainer>
          <CardDetailsCol>
            <DetailsSubRow>
              <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
              <Typography variant="body_sm" color="on_surface_variant">
                {t('admin.manage_sessions.session_date') || 'Session'}: {session.sessionDate}
              </Typography>
            </DetailsSubRow>

            {type === 'upcoming' && (
              <>
                <DetailsSubRow>
                  <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
                  <Typography variant="body_sm" color="on_surface_variant">
                    {t('admin.manage_sessions.booking_date') || 'Booking'}: {session.bookingOpenDate}
                  </Typography>
                </DetailsSubRow>
                <DetailsSubRow>
                  <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                  <Typography variant="body_sm" color="on_surface_variant">
                    {formattedTime}
                  </Typography>
                </DetailsSubRow>
              </>
            )}

            {type === 'live' && (
              <DetailsSubRow>
                <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                <Typography variant="body_sm" color="on_surface_variant">
                  {formattedTime}
                </Typography>
              </DetailsSubRow>
            )}
          </CardDetailsCol>

          {type === 'live' && (
            <SlotsText variant="label_caps" color="primary">
              {t('user.home_booking_status.slots_left', { count: session.slotsLeft })}
            </SlotsText>
          )}
        </RowContainer>

        {type === 'live' && (
          <>
            <ProgressTrack>
              <ProgressFill progress={progress} />
            </ProgressTrack>

            <ActionButtonWrapper>
              <Button
                label={t('user.home_booking_status.reserve_seat')}
                onPress={handlePress}
                variant="primary"
                fullWidth
              />
            </ActionButtonWrapper>
          </>
        )}
      </CardContentBody>
    </BentoCardContainer>
  );
});

UserSessionCard.displayName = 'UserSessionCard';
