import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const WelcomeSection = styled(Box)`
  margin-vertical: ${verticalScale(24)}px;
  gap: ${verticalScale(4)}px;
`;

export const HeaderLabelContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const AvailableSlotsTag = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
`;

export const BentoCardContainer = styled(Box)`
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
`;

export const CardBannerImage = styled(FastImage)`
  height: ${verticalScale(180)}px;
  width: 100%;
`;

export const CardImageOverlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${verticalScale(90)}px;
  padding: ${scale(16)}px;
  justify-content: flex-end;
`;

export const CardContentBody = styled(Box)`
  padding: ${scale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const RowContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DetailsSubRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const ProgressTrack = styled(Box)`
  height: ${verticalScale(6)}px;
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled(Box)<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress * 100}%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  border-radius: 999px;
`;

export const GridContainer = styled(Box)`
  margin-top: ${verticalScale(16)}px;
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const AsymmetricGridCard = styled.Pressable`
  flex: 1;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${verticalScale(8)}px;
  height: ${verticalScale(120)}px;
`;

export const EmptyStateContainer = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding-vertical: ${verticalScale(48)}px;
  padding-horizontal: ${scale(24)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(16)}px;
  margin-top: ${verticalScale(16)}px;
`;

export const EmptyStateIconCircle = styled(Box)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  align-items: center;
  justify-content: center;
`;

export const NotifyButton = styled.Pressable`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  padding-bottom: ${verticalScale(2)}px;
`;

export const ToggleFloatingButton = styled.Pressable`
  position: absolute;
  right: ${scale(20)}px;
  bottom: ${verticalScale(100)}px;
  width: ${scale(52)}px;
  height: ${scale(52)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.secondary_container};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
  z-index: 99;
`;

export const LoadingOverlay = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(48)}px;
`;
