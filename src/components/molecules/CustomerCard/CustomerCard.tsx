import React from 'react';
import { Trash2, Calendar } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import {
  CardContainer,
  CardHeader,
  ProfileInfo,
  InitialsAvatar,
  CardFooter,
  ActionButtons,
  ActionButton,
  Divider,
} from './CustomerCard.styles';

export interface CustomerCardProps {
  initials: string;
  name: string;
  phone: string;
  status: 'Premium' | 'Regular';
  lastVisit: string;
  avatarColorHex?: string;
  onPress?: () => void;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

export const CustomerCard = React.memo(({
  initials,
  name,
  phone,
  lastVisit,
  avatarColorHex,
  onPress,
  onDeletePress,
}: CustomerCardProps) => {
  const theme = useTheme() as ThemeType;

  // Fallback to primary fixed if no color provided
  const bgColor = avatarColorHex || theme.colors.primary_fixed;
  // If we had a generic way to determine text color for the dynamic bg, we would use it here. 
  // For simplicity, we'll assume a dark primary text for fixed light colors, or hardcode it.
  const textColor = theme.colors.primary;

  return (
    <CardContainer onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
      <CardHeader>
        <ProfileInfo>
          <InitialsAvatar bgColor={bgColor as string}>
            <Typography variant="headline_md" style={{ color: textColor as string, fontWeight: '700' }}>
              {initials}
            </Typography>
          </InitialsAvatar>
          <Box style={{ flex: 1, paddingLeft: scale(4) }}>
            <Typography variant="body_lg" color="on_surface" style={{ fontWeight: '600' }} numberOfLines={1}>
              {name}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: verticalScale(2) }} numberOfLines={1}>
              {phone}
            </Typography>
          </Box>
        </ProfileInfo>
        <ActionButtons>
          {onDeletePress && (
            <ActionButton onPress={onDeletePress} isDestructive>
              <Trash2 color={theme.colors.on_surface_variant as string} size={scale(20)} />
            </ActionButton>
          )}
        </ActionButtons>
      </CardHeader>

      <Divider />

      <CardFooter>
        <Calendar color={theme.colors.on_surface_variant as string} size={scale(18)} />
        <Typography variant="body_sm" color="on_surface_variant">
          Created At: <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>{lastVisit}</Typography>
        </Typography>
      </CardFooter>
    </CardContainer>
  );
});

CustomerCard.displayName = 'CustomerCard';
