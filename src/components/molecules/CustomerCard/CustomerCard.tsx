import React from 'react';
import { Pencil, Trash2 } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/atoms/Badge';
import { Box } from '@/components/atoms/Box';
import { scale } from '@/styles/scaling';
import {
  CardContainer,
  CardHeader,
  ProfileInfo,
  InitialsAvatar,
  CardFooter,
  ActionButtons,
  ActionButton,
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
  status,
  lastVisit,
  avatarColorHex,
  onPress,
  onEditPress,
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
          <Box style={{ flex: 1 }}>
            <Typography variant="headline_md" color="on_surface" style={{ fontSize: 18, fontWeight: '600' }} numberOfLines={1}>
              {name}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" numberOfLines={1}>
              {phone}
            </Typography>
          </Box>
        </ProfileInfo>
        <Badge 
          label={status} 
          colorVariant={status === 'Premium' ? 'secondary' : 'surface_variant'} 
        />
      </CardHeader>

      <CardFooter>
        <Box>
          <Typography variant="label_caps" color="outline" style={{ fontSize: 10 }}>
            LAST VISIT
          </Typography>
          <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '600' }}>
            {lastVisit}
          </Typography>
        </Box>
        <ActionButtons>
          <ActionButton onPress={onEditPress}>
            <Pencil color={theme.colors.on_surface_variant as string} size={scale(18)} />
          </ActionButton>
          <ActionButton onPress={onDeletePress} isDestructive>
            <Trash2 color={theme.colors.error as string} size={scale(18)} />
          </ActionButton>
        </ActionButtons>
      </CardFooter>
    </CardContainer>
  );
});

CustomerCard.displayName = 'CustomerCard';
