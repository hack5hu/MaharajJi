import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const StyledChip = styled(TouchableOpacity)<{ isActive?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: 9999px;
  background-color: ${({ theme, isActive }: { theme: ThemeType, isActive?: boolean }) => 
    isActive ? theme.colors.primary : theme.colors.surface_container_high};
  ${({ isActive }) => isActive ? `
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.1;
    shadow-radius: 12px;
    elevation: 4;
  ` : ''}
`;

export const ChipIconWrapper = styled(Box)`
  margin-right: ${scale(8)}px;
`;

export interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
}

export const Chip = React.memo(({ label, icon, isActive, onPress }: ChipProps) => {
  return (
    <StyledChip isActive={isActive} onPress={onPress} activeOpacity={0.7}>
      {icon && <ChipIconWrapper>{icon}</ChipIconWrapper>}
      <Typography 
        variant="label_caps" 
        color={isActive ? "on_primary" : "on_surface_variant"}
        style={{ fontWeight: '600' }}
      >
        {label}
      </Typography>
    </StyledChip>
  );
});

Chip.displayName = 'Chip';
