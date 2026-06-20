import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { useLocale } from '@/hooks/useLocale';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';
import { Power, PlusCircle } from 'lucide-react-native';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { 
  HeroContainer, StatusCard, StatusHeader, StatusBadgeContainer, 
  ToggleButton, QuickActionsCard, PrimaryActionButton, 
  SecondaryActionsContainer, SecondaryActionButton 
} from './BookingStatusHero.styles';

export interface BookingStatusHeroProps {
  style?: ViewStyle;
}

export const BookingStatusHero = React.memo(({ style }: BookingStatusHeroProps) => {
  const { t } = useLocale();
  const theme = useTheme() as ThemeType;
  const navigation = useAppNavigation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleStatus = () => setIsOpen(!isOpen);

  return (
    <HeroContainer style={style}>
      {/* Left Card: Status */}
      <StatusCard>
        <StatusHeader>
          <Box>
            <Typography variant="label_caps" color="on_surface_variant">
              {t('admin.dashboard_home.booking_system')}
            </Typography>
            <Typography variant="headline_md" color="on_surface" style={{ marginTop: verticalScale(4) }}>
              {t('admin.dashboard_home.current_status')}
            </Typography>
          </Box>
          <StatusBadgeContainer isOpen={isOpen}>
            <Typography variant="status_label" color="on_primary" style={{ textTransform: 'uppercase' }}>
              {isOpen ? t('admin.dashboard_home.status_open') : t('admin.dashboard_home.status_closed')}
            </Typography>
          </StatusBadgeContainer>
        </StatusHeader>
        
        <ToggleButton 
          onPress={toggleStatus}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <Power color={theme.colors.surface as string} size={moderateScale(16)} style={{ marginRight: scale(8) }} />
          <Typography variant="body_sm" color="surface" style={{ fontWeight: '700' }}>
            {t('admin.dashboard_home.open_close_booking')}
          </Typography>
        </ToggleButton>
      </StatusCard>

      {/* Right Card: Quick Actions */}
      <QuickActionsCard>
        <PrimaryActionButton 
          onPress={() => navigation.navigate('CreateNewSessionAdmin')}
          style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
        >
          <PlusCircle color={theme.colors.on_primary_container as string} size={moderateScale(20)} style={{ marginRight: scale(12) }} />
          <Typography variant="body_lg" color="on_primary_container" style={{ fontWeight: '700' }}>
            {t('admin.dashboard_home.create_new_booking')}
          </Typography>
        </PrimaryActionButton>
        
        <SecondaryActionsContainer>
          <SecondaryActionButton isLeft style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '700' }}>
              {t('admin.dashboard_home.broadcast_news')}
            </Typography>
          </SecondaryActionButton>
          <SecondaryActionButton style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
            <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '700' }}>
              {t('admin.dashboard_home.export_data')}
            </Typography>
          </SecondaryActionButton>
        </SecondaryActionsContainer>
      </QuickActionsCard>
    </HeroContainer>
  );
});

BookingStatusHero.displayName = 'BookingStatusHero';
