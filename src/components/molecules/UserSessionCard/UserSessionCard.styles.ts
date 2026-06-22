import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const BentoCardContainer = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  overflow: hidden;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
`;

export const CardBannerImage = styled(FastImage)`
  height: ${verticalScale(180)}px;
  width: 100%;
`;

export const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${verticalScale(100)}px;
  justify-content: flex-end;
  padding: ${scale(16)}px;
`;

export const OverlayTagText = styled(Typography)`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_primary};
  opacity: 0.9;
`;

export const OverlayTitleText = styled(Typography)`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_primary};
  font-weight: 700;
  font-size: ${scale(20)}px;
`;

export const CardContentBody = styled(Box)`
  padding: ${scale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const RowContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CardDetailsCol = styled(Box)`
  flex: 1;
  gap: ${scale(6)}px;
`;

export const DetailsSubRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const SlotsText = styled(Typography)`
  font-weight: 700;
  margin-left: ${scale(8)}px;
`;

export const ProgressTrack = styled(Box)`
  height: ${verticalScale(6)}px;
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  border-radius: 999px;
  overflow: hidden;
  margin-top: ${verticalScale(12)}px;
`;

export const ProgressFill = styled(Box)<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => Math.max(0, Math.min(100, progress * 100))}%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  border-radius: 999px;
`;

export const ActionButtonWrapper = styled(Box)`
  margin-top: ${verticalScale(16)}px;
`;
