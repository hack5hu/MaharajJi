import React from 'react';
import styled from 'styled-components/native';
import { Pressable, ViewStyle } from 'react-native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

const StyledFabContainer = styled(Pressable)<{ bottom?: number }>`
  position: absolute;
  bottom: ${({ bottom }) => bottom ?? verticalScale(96)}px;
  right: ${scale(24)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 10;
  z-index: 99;
  height: ${scale(56)}px;
  min-width: ${scale(56)}px;
  padding-horizontal: ${scale(16)}px;
  overflow: hidden;
`;

const IconWrapper = styled(Box)<{ hasLabel: boolean }>`
  margin-right: ${({ hasLabel }) => hasLabel ? scale(8) : 0}px;
`;

export interface FABProps {
  icon: React.ReactNode;
  label?: string;
  onPress: () => void;
  style?: ViewStyle;
  bottom?: number;
}

export const FAB = React.memo(({ icon, label, onPress, style, bottom }: FABProps) => {
  return (
    <StyledFabContainer
      onPress={onPress}
      bottom={bottom}
      style={({ pressed }) => [
        style,
        {
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }]
        }
      ]}
    >
      <IconWrapper hasLabel={!!label}>{icon}</IconWrapper>
      {label && (
        <Typography variant="body_lg" color="on_primary_container" style={{ fontWeight: '700' }}>
          {label}
        </Typography>
      )}
    </StyledFabContainer>
  );
});

FAB.displayName = 'FAB';
