import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { 
  RowContainer, CustomerCell, AvatarContainer, 
  ServiceCell, DateCell, StatusCell 
} from './BookingTableRow.styles';

export interface BookingTableRowProps {
  initials: string;
  avatarBgColor: string;
  avatarTextColor: string;
  customerName: string;
  service: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  style?: ViewStyle;
}

export const BookingTableRow = React.memo(({ 
  initials, avatarBgColor, avatarTextColor, customerName, service, date, status, style 
}: BookingTableRowProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <RowContainer style={style}>
      {/* Customer Info */}
      <CustomerCell>
        <AvatarContainer bgColor={avatarBgColor}>
          <Typography variant="label_caps" color="on_surface" style={{ color: avatarTextColor, fontWeight: '700' }}>
            {initials}
          </Typography>
        </AvatarContainer>
        <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
          {customerName}
        </Typography>
      </CustomerCell>

      {/* Service */}
      <ServiceCell>
        <Typography variant="body_sm" color="on_surface_variant">
          {service}
        </Typography>
      </ServiceCell>

      {/* Date */}
      <DateCell>
        <Typography variant="body_sm" color="on_surface_variant">
          {date}
        </Typography>
      </DateCell>

      {/* Status */}
      <StatusCell>
        <StatusBadge 
          type={status === 'Confirmed' ? 'live' : 'trend'} 
          label={status} 
        />
      </StatusCell>
    </RowContainer>
  );
});

BookingTableRow.displayName = 'BookingTableRow';
