import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { AttendeeCardProps } from './types.d';
import {
  AttendeeCardContainer,
  AttendeeInfo,
  AvatarInitials,
  InitialsText,
  AttendeeDetails,
  AttendeeNameText,
  AttendeeStatus,
  TokenBadge,
} from './AttendeeCard.styles';

export const AttendeeCard = React.memo(({
  customerName,
  customerPhone,
  status,
  numberOfPeople,
  tokenNumber,
  bookingId,
  onPress,
}: AttendeeCardProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  // Generate initials from name
  const initials = useMemo(() => {
    return customerName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || '?';
  }, [customerName]);

  // Pick a consistent color based on char code
  const bgColor = useMemo(() => {
    const colors = [
      theme.colors.secondary_container,
      theme.colors.primary_fixed_dim,
      theme.colors.tertiary_container,
      '#e0e0ff',
      '#ffdcc2',
    ];
    const colorIndex = (customerName.charCodeAt(0) || 0) % colors.length;
    return colors[colorIndex] as string;
  }, [customerName, theme]);

  const isWaitlisted = useMemo(() => {
    return status.toUpperCase() === 'WAITLISTED';
  }, [status]);

  const initialsColor = theme.colors.on_surface;

  return (
    <AttendeeCardContainer onPress={onPress} isWaitlisted={isWaitlisted} disabled={!onPress}>
      <AttendeeInfo>
        <AvatarInitials bgColor={bgColor}>
          <InitialsText variant="headline_md" initialsColor={initialsColor}>
            {initials}
          </InitialsText>
        </AvatarInitials>
        <AttendeeDetails>
          <AttendeeNameText variant="headline_md" color="on_surface">
            {customerName}
          </AttendeeNameText>
          <Typography variant="body_sm" color="on_surface_variant">
            {customerPhone}
          </Typography>
        </AttendeeDetails>
      </AttendeeInfo>
      <AttendeeStatus>
        <Typography
          variant="status_label"
          color={isWaitlisted ? 'on_surface_variant' : 'primary'}
        >
          {numberOfPeople === 1
            ? t('admin.session_attendees.person', { count: 1 })
            : t('admin.session_attendees.people', { count: numberOfPeople })}
        </Typography>
        <TokenBadge>
          <Typography variant="label_caps" color="on_primary_container" style={{ fontWeight: '800', letterSpacing: 0.5 }}>
            TOKEN #{tokenNumber}
          </Typography>
        </TokenBadge>
      </AttendeeStatus>
    </AttendeeCardContainer>
  );
});

AttendeeCard.displayName = 'AttendeeCard';
