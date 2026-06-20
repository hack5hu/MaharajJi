import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/hooks/useLocale';
import { BookingTableRow } from '@/components/molecules/BookingTableRow';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { TableContainer, TableHeaderContainer, TableColumnsContainer, ScrollContentContainer } from './RecentBookingsTable.styles';

const StyledScrollView = styled.ScrollView``;

export interface RecentBookingsTableProps {
  style?: ViewStyle;
}

export const RecentBookingsTable = React.memo(({ style }: RecentBookingsTableProps) => {
  const { t } = useLocale();
  const theme = useTheme() as ThemeType;

  return (
    <TableContainer style={style}>
      {/* Header */}
      <TableHeaderContainer>
        <Typography variant="headline_md" color="on_surface">
          {t('admin.dashboard_home.recent_bookings')}
        </Typography>
        <Typography variant="label_caps" color="primary" style={{ textDecorationLine: 'underline' }}>
          {t('admin.dashboard_home.view_all')}
        </Typography>
      </TableHeaderContainer>

      {/* Table columns */}
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ScrollContentContainer>
          <TableColumnsContainer>
            <Typography variant="label_caps" color="on_surface_variant" style={{ flex: 1.5, fontWeight: '600' }}>
              {t('admin.dashboard_home.table_customer')}
            </Typography>
            <Typography variant="label_caps" color="on_surface_variant" style={{ flex: 1, fontWeight: '600' }}>
              {t('admin.dashboard_home.table_service')}
            </Typography>
            <Typography variant="label_caps" color="on_surface_variant" style={{ flex: 1, fontWeight: '600' }}>
              {t('admin.dashboard_home.table_date')}
            </Typography>
            <Typography variant="label_caps" color="on_surface_variant" style={{ flex: 0.8, fontWeight: '600' }}>
              {t('admin.dashboard_home.table_status')}
            </Typography>
          </TableColumnsContainer>

          <BookingTableRow
            initials="AM"
            avatarBgColor={theme.colors.primary_fixed}
            avatarTextColor={theme.colors.primary}
            customerName="Aria Montgomery"
            service="Morning Meditation"
            date="Oct 24, 09:00 AM"
            status="Confirmed"
          />
          <BookingTableRow
            initials="BK"
            avatarBgColor={theme.colors.secondary_fixed}
            avatarTextColor={theme.colors.secondary}
            customerName="Benjamin Kim"
            service="Evening Ritual"
            date="Oct 24, 06:30 PM"
            status="Pending"
          />
          <BookingTableRow
            initials="SL"
            avatarBgColor={theme.colors.tertiary_fixed_dim}
            avatarTextColor={theme.colors.tertiary}
            customerName="Sarah L'etoile"
            service="Youth Workshop"
            date="Oct 25, 02:00 PM"
            status="Confirmed"
          />
        </ScrollContentContainer>
      </StyledScrollView>
    </TableContainer>
  );
});

RecentBookingsTable.displayName = 'RecentBookingsTable';
