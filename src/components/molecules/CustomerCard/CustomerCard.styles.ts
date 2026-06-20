import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const CardContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 4;
`;

export const CardHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(16)}px;
`;

export const ProfileInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const InitialsAvatar = styled(Box)<{ bgColor: string }>`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  background-color: ${({ bgColor }) => bgColor};
  align-items: center;
  justify-content: center;
`;

export const CardFooter = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const ActionButtons = styled(Box)`
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const ActionButton = styled(TouchableOpacity)<{ isDestructive?: boolean }>`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme, isDestructive }: { theme: ThemeType, isDestructive?: boolean }) => 
    isDestructive ? 'rgba(186, 26, 26, 0.2)' : theme.colors.outline_variant};
  background-color: ${({ theme, isDestructive }: { theme: ThemeType, isDestructive?: boolean }) => 
    isDestructive ? 'transparent' : 'transparent'};
`;
