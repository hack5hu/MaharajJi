import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const ScreenContainer = styled(Box)`
  flex: 1;
  width: 100%;
`;

export const HeroContainer = styled(Box)`
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(24)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const PulseRing = styled(Box)`
  position: absolute;
  width: ${scale(110)}px;
  height: ${scale(110)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary}1A;
`;

export const CheckCircle = styled(Box)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 4;
`;

export const TextCenter = styled(Box)`
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
  gap: ${verticalScale(6)}px;
`;

export const CardWrapper = styled(Box)`
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 3;
  margin-bottom: ${verticalScale(24)}px;
`;

export const CardHeader = styled(Box)`
  padding: ${scale(16)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-style: dashed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardBannerImage = styled(FastImage)`
  height: ${verticalScale(120)}px;
  width: 100%;
`;

export const ImageOverlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${verticalScale(60)}px;
`;

export const GridContainer = styled(Box)`
  padding: ${scale(16)}px;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: ${verticalScale(16)}px;
`;

export const GridCol = styled(Box)`
  width: 50%;
  gap: ${verticalScale(4)}px;
`;

export const InfoBanner = styled(Box)`
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${scale(16)}px;
  padding: ${scale(12)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.secondary_fixed}33;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.md}px;
  flex-direction: row;
  gap: ${scale(8)}px;
  align-items: flex-start;
`;

export const ButtonContainer = styled(Box)`
  width: 100%;
  gap: ${verticalScale(12)}px;
  align-items: center;
`;
