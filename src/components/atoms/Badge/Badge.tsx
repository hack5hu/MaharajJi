import React from 'react';
import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

const StyledBadge = styled(Box)<{ colorVariant: 'primary' | 'secondary' | 'tertiary' | 'surface_variant' }>`
  background-color: ${({ theme, colorVariant }: { theme: ThemeType, colorVariant: string }) => {
    if (colorVariant === 'primary') return theme.colors.primary_container;
    if (colorVariant === 'secondary') return theme.colors.secondary_container;
    if (colorVariant === 'tertiary') return theme.colors.tertiary_container;
    return theme.colors.surface_variant;
  }};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.sm}px;
  align-items: center;
  justify-content: center;
`;

export interface BadgeProps {
  label: string;
  colorVariant?: 'primary' | 'secondary' | 'tertiary' | 'surface_variant';
}

export const Badge = React.memo(({ label, colorVariant = 'surface_variant' }: BadgeProps) => {
  return (
    <StyledBadge colorVariant={colorVariant}>
      <Typography 
        variant="label_caps" 
        color={
          colorVariant === 'primary' ? 'on_primary_container' : 
          colorVariant === 'secondary' ? 'on_secondary_container' : 
          colorVariant === 'tertiary' ? 'on_tertiary_container' : 
          'on_surface_variant'
        }
        style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: '700', textTransform: 'uppercase' }}
      >
        {label}
      </Typography>
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';
