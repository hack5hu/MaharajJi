import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const CardContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 4;
`;

export const CardHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ProfileInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const InitialsAvatar = styled(Box)<{ bgColor: string }>`
  width: ${scale(56)}px;
  height: ${scale(56)}px;
  border-radius: 9999px;
  background-color: ${({ bgColor }) => bgColor};
  align-items: center;
  justify-content: center;
`;

export const CardFooter = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(12)}px;
  background-color: transparent;
`;

export const ActionButtons = styled(Box)`
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const ActionButton = styled(TouchableOpacity)<{ isDestructive?: boolean }>`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const Divider = styled(Box)`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  opacity: 0.3;
  margin-top: ${verticalScale(16)}px;
`;
