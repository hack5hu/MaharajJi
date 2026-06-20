import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const ProfileHeaderContainer = styled(Box)`
  align-items: center;
  margin-top: ${verticalScale(32)}px;
  margin-bottom: ${verticalScale(24)}px;
  gap: ${verticalScale(12)}px;
`;

export const AvatarWrapper = styled(Box)`
  position: relative;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 4;
`;

export const ProfileAvatar = styled(FastImage)`
  width: ${scale(110)}px;
  height: ${scale(110)}px;
  border-radius: 999px;
`;

export const ProfileCard = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 3;
  gap: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const InfoItem = styled(Box)`
  gap: ${verticalScale(4)}px;
`;

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  width: 100%;
`;

export const ButtonWrapper = styled(Box)`
  margin-top: ${verticalScale(8)}px;
`;
