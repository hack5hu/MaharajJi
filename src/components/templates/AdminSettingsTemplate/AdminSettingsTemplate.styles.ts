import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop + verticalScale(16)}px;
  padding-bottom: ${verticalScale(16)}px;
  padding-horizontal: ${scale(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  z-index: 10;
`;

export const LeftSection = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const HeaderAvatar = styled(FastImage)`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: ${scale(18)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
`;

export const HeaderNotificationBtn = styled.Pressable`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${scale(20)}px;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled(Box)`
  padding: ${scale(24)}px;
`;

export const BottomNavWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
`;
