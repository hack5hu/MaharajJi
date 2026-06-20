import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles/scaling';
import { Users, CalendarCheck, CalendarOff, Ticket, Search, Radio } from 'lucide-react-native';
import { CardContainer, HeaderContainer, ContentContainer } from './BentoStatCard.styles';

export interface BentoStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor?: keyof ThemeType['colors'];
  badgeType?: 'live' | 'trend';
  badgeLabel?: string;
  highlight?: boolean;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const BentoStatCard = React.memo(({ title, value, icon, iconColor = 'primary', badgeType, badgeLabel, highlight, subtitle, children, style }: BentoStatCardProps) => {
  const theme = useTheme() as ThemeType;

  const renderIcon = (iconName: string, color: string, size: number) => {
    switch (iconName) {
      case 'groups': return <Users color={color} size={size} />;
      case 'event_available': return <CalendarCheck color={color} size={size} />;
      case 'event_busy': return <CalendarOff color={color} size={size} />;
      case 'token': return <Ticket color={color} size={size} />;
      case 'sensors': return <Radio color={color} size={size} />;
      case 'calendar_today': return <CalendarCheck color={color} size={size} />;
      default: return <Search color={color} size={size} />;
    }
  };

  const actualIconColor = highlight ? theme.colors.on_primary_container : theme.colors[iconColor];

  return (
    <CardContainer highlight={highlight} style={style}>
      <Box>
        <HeaderContainer>
          <Box>
            {renderIcon(icon, actualIconColor as string, moderateScale(24))}
          </Box>
          {badgeLabel && badgeType && (
            <StatusBadge type={badgeType} label={badgeLabel} />
          )}
        </HeaderContainer>

        <ContentContainer>
          <Typography variant="label_caps" color={highlight ? 'on_primary_container' : 'on_surface_variant'}>
            {title}
          </Typography>
          <Typography variant="headline_lg" color={highlight ? 'on_primary_container' : 'on_surface'} style={{ fontWeight: '700' }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body_sm" color={highlight ? 'on_primary_container' : 'on_surface_variant'}>
              {subtitle}
            </Typography>
          )}
        </ContentContainer>
      </Box>
      {children}
    </CardContainer>
  );
});

BentoStatCard.displayName = 'BentoStatCard';
