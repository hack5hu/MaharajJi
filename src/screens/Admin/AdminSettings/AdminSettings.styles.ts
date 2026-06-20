import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const ProfileHeaderContainer = styled(Box)`
  align-items: center;
  margin-bottom: ${verticalScale(32)}px;
`;

export const AvatarWrapper = styled(Box)`
  width: ${scale(100)}px;
  height: ${scale(100)}px;
  border-radius: ${scale(50)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  margin-bottom: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  border-width: 4px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const ProfileAvatar = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: ${scale(50)}px;
`;

export const ProfileCard = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

export const InfoItem = styled(Box)`
  gap: ${verticalScale(4)}px;
`;

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  margin-vertical: ${verticalScale(16)}px;
`;

export const ButtonWrapper = styled(Box)`
  margin-top: ${verticalScale(16)}px;
`;
