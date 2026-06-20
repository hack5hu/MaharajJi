import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { Check, Calendar, Clock, Users, MapPin, Info } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { BookingSuccessfulTemplate } from '@/components/templates/BookingSuccessfulTemplate';
import { useBookingSuccessful } from './useBookingSuccessful';
import { BookingSuccessfulScreenRouteProp } from './types.d';
import {
  ScreenContainer,
  HeroContainer,
  PulseRing,
  CheckCircle,
  TextCenter,
  CardWrapper,
  CardHeader,
  CardBannerImage,
  GridContainer,
  GridCol,
  InfoBanner,
  ButtonContainer,
} from './BookingSuccessful.styles';

export const BookingSuccessful = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const route = useRoute<BookingSuccessfulScreenRouteProp>();

  // Default fallback values if params are missing
  const bookingId = route.params?.bookingId || '#SS-88291';
  const tokenNo = route.params?.tokenNo || 'A-42';
  const date = route.params?.date || 'Oct 24, 2023';
  const time = route.params?.time || '08:00 AM';
  const attendees = route.params?.attendees || 2;
  const hall = route.params?.hall || 'Main Chapel';
  const imageUrl = route.params?.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-6JGNAokKE2FmYtxezQnj3ec4ZM0ZKRTGbSM2X7PhCqveWUUsw306MZd36PcORyeuikA7N3nJk02WtUuIg-giBW-jNhQCYSnVzDtGe8btW7uYkqPVKBkUXi1q5IijqbvL-raEaUEjpufWmhl7ZZHrPoYevp8OFH3tWDBLkwXh050O2mbWAWCqIJAo2vrZyT2KGhmu23ighquJTI7-oID-1oIU6p_Pq0hCgC1f1z4Sb2jTtYUQMMS7xdlAooItXACJbIkwzRvNY8I';

  const {
    handleAddCalendar,
    handleViewAllBookings,
    handleBackHome,
  } = useBookingSuccessful(bookingId);

  return (
    <ScreenContainer>
      <BookingSuccessfulTemplate>
        {/* Success State Hero */}
        <HeroContainer>
          <PulseRing />
          <CheckCircle>
            <Check color="#ffffff" size={scale(40)} />
          </CheckCircle>
        </HeroContainer>

        <TextCenter>
          <Typography variant="headline_lg_mobile" color="on_surface" style={{ fontWeight: '700' }}>
            {t('user.booking_successful.confirmed_title')}
          </Typography>
          <Typography variant="body_sm" color="on_surface_variant">
            {t('user.booking_successful.confirmed_desc')}
          </Typography>
        </TextCenter>

        {/* Token & Booking Card */}
        <CardWrapper>
          {/* Header Section */}
          <CardHeader>
            <Box>
              <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700', fontSize: 10 }}>
                {t('user.booking_successful.booking_id_label')}
              </Typography>
              <Typography variant="headline_md" color="primary" style={{ fontWeight: '700', marginTop: 2 }}>
                {bookingId}
              </Typography>
            </Box>
            <Box style={{ alignItems: 'flex-end' }}>
              <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700', fontSize: 10 }}>
                {t('user.booking_successful.token_no_label')}
              </Typography>
              <Typography variant="headline_md" color="secondary" style={{ fontWeight: '700', marginTop: 2 }}>
                {tokenNo}
              </Typography>
            </Box>
          </CardHeader>

          {/* Image */}
          <Box style={{ position: 'relative' }}>
            <CardBannerImage source={{ uri: imageUrl }} />
          </Box>

          {/* Detail Grid */}
          <GridContainer>
            <GridCol>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                <Calendar color={theme.colors.on_surface_variant as string} size={scale(16)} />
                <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
                  {t('user.booking_successful.date_label')}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {date}
              </Typography>
            </GridCol>

            <GridCol>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                <Clock color={theme.colors.on_surface_variant as string} size={scale(16)} />
                <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
                  {t('user.booking_successful.time_label')}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {time}
              </Typography>
            </GridCol>

            <GridCol>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                <Users color={theme.colors.on_surface_variant as string} size={scale(16)} />
                <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
                  {t('user.booking_successful.attendees_label')}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {attendees === 1 ? '1 Person' : `${attendees} People`}
              </Typography>
            </GridCol>

            <GridCol>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                <MapPin color={theme.colors.on_surface_variant as string} size={scale(16)} />
                <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700' }}>
                  {t('user.booking_successful.hall_label')}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {hall}
              </Typography>
            </GridCol>
          </GridContainer>

          {/* Information Footer */}
          <InfoBanner>
            <Info color={theme.colors.secondary as string} size={scale(18)} />
            <Typography variant="body_sm" color="on_surface_variant" style={{ flex: 1, lineHeight: 18 }}>
              {t('user.booking_successful.info_footer')}
            </Typography>
          </InfoBanner>
        </CardWrapper>

        {/* Action Buttons */}
        <ButtonContainer>
          <Button
            label={t('user.booking_successful.add_to_calendar')}
            onPress={handleAddCalendar}
            variant="primary"
            fullWidth
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
          <Button
            label={t('user.booking_successful.view_all_bookings')}
            onPress={handleViewAllBookings}
            variant="outline"
            fullWidth
            style={{
              borderRadius: theme.rounded.lg,
              paddingVertical: verticalScale(14),
            }}
          />
          <Pressable onPress={handleBackHome} style={{ marginTop: scale(8) }}>
            <Typography variant="label_caps" color="on_surface_variant" style={{ fontWeight: '700', paddingBottom: scale(2) }}>
              {t('user.booking_successful.back_to_home')}
            </Typography>
          </Pressable>
        </ButtonContainer>
      </BookingSuccessfulTemplate>
    </ScreenContainer>
  );
});

BookingSuccessful.displayName = 'BookingSuccessful';
