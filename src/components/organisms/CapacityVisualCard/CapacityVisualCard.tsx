import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/hooks/useLocale';
import { verticalScale } from '@/styles/scaling';
import { CardContainer, StyledImageBackground, Overlay, BadgeContainer, ContentContainer } from './CapacityVisualCard.styles';

export interface CapacityVisualCardProps {
  style?: ViewStyle;
}

export const CapacityVisualCard = React.memo(({ style }: CapacityVisualCardProps) => {
  const { t } = useLocale();

  return (
    <CardContainer style={style}>
      <StyledImageBackground source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_vo_6yU7CXFp6tSPm9kj8Not2iCnxxvbHT0UzN8aw0YkWSYJ2vbbiat4tCQjLc_KeI2Myg0Hr8EorMDvR7siTcvXf74KBzrEDZCPMri8oJXsRP2IkNiL7dy_QU_hwkBgQBfaLqEXms757pDHDXqhV3R1Vo10T-3ZZwEbwCAZLR5cxNJQCrLEv_gOAh14bFk-aQ-8DzP3DgcyIVFrdjKclJmR_rN7sfNcHANEZcnDOe9ifC9huJuhTsnA2_WJXdMN_lwfMDK8daQ' }}>
        <Overlay />
        
        {/* Top Right Badge */}
        <BadgeContainer>
          <Typography variant="status_label" color="on_primary" style={{ color: 'white' }}>
            {t('admin.dashboard_home.trending_up')}
          </Typography>
        </BadgeContainer>

        {/* Bottom Content */}
        <ContentContainer>
          <Typography variant="headline_md" color="on_primary" style={{ color: 'white' }}>
            {t('admin.dashboard_home.peak_engagement')}
          </Typography>
          <Typography variant="body_sm" color="on_primary" style={{ color: 'white', opacity: 0.9, marginTop: verticalScale(4) }}>
            {t('admin.dashboard_home.peak_engagement_desc')}
          </Typography>
        </ContentContainer>
      </StyledImageBackground>
    </CardContainer>
  );
});

CapacityVisualCard.displayName = 'CapacityVisualCard';


