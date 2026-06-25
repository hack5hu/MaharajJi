import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { Check, Calendar, Users, MapPin } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { BookingSuccessfulTemplate } from '@/components/templates/BookingSuccessfulTemplate';
import { useBookingSuccessful } from './useBookingSuccessful';
import { BookingSuccessfulScreenRouteProp } from './types.d';
import { useAppNavigation } from '@/navigation/useAppNavigation';
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
  ButtonContainer,
} from './BookingSuccessful.styles';

export const BookingSuccessful = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const route = useRoute<BookingSuccessfulScreenRouteProp>();
  const navigation = useAppNavigation();

  // Default fallback values if params are missing
  const tokenNumber = route.params?.tokenNumber || 0;
  const date = route.params?.date || 'All Day';
  const attendees = route.params?.attendees || 1;
  const location = route.params?.location || 'Main Chapel';
  const imageUrl = route.params?.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-6JGNAokKE2FmYtxezQnj3ec4ZM0ZKRTGbSM2X7PhCqveWUUsw306MZd36PcORyeuikA7N3nJk02WtUuIg-giBW-jNhQCYSnVzDtGe8btW7uYkqPVKBkUXi1q5IijqbvL-raEaUEjpufWmhl7ZZHrPoYevp8OFH3tWDBLkwXh050O2mbWAWCqIJAo2vrZyT2KGhmu23ighquJTI7-oID-1oIU6p_Pq0hCgC1f1z4Sb2jTtYUQMMS7xdlAooItXACJbIkwzRvNY8I';

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Prevent iOS swipe-to-go-back gesture
    navigation.setOptions({
      gestureEnabled: false,
    });

    return () => backHandler.remove();
  }, [navigation]);

  const {
    handleViewAllBookings,
  } = useBookingSuccessful();

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
                {t('user.booking_successful.token_no_label') || 'TOKEN NO.'}
              </Typography>
              <Typography variant="headline_md" color="primary" style={{ fontWeight: '700', marginTop: 2 }}>
                #{tokenNumber}
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
                  {t('user.booking_successful.location_label') || 'LOCATION'}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }}>
                {location}
              </Typography>
            </GridCol>
          </GridContainer>
        </CardWrapper>

        {/* Action Buttons */}
        <ButtonContainer>
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
        </ButtonContainer>
      </BookingSuccessfulTemplate>
    </ScreenContainer>
  );
});

BookingSuccessful.displayName = 'BookingSuccessful';
