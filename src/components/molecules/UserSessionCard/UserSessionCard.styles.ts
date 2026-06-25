import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import { Button } from '@/components/atoms/Button';

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
  height: ${verticalScale(120)}px;
  width: 100%;
`;

export const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${verticalScale(80)}px;
  justify-content: flex-end;
  padding: ${scale(12)}px;
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
  padding: ${scale(12)}px;
  gap: ${verticalScale(12)}px;
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
  margin-top: ${verticalScale(8)}px;
`;

export const ProgressFill = styled(Box)<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => Math.max(0, Math.min(100, progress * 100))}%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  border-radius: 999px;
`;

export const ActionButtonWrapper = styled(Box)`
  margin-top: ${verticalScale(12)}px;
`;

export const GradientButtonContainer = styled(LinearGradient)`
  border-radius: ${scale(12)}px;
  overflow: hidden;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const ConfirmButton = styled(Button)`
  background-color: transparent;
`;


export const BookingWindowContainer = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.tertiary_container || theme.colors.surface_variant};
  border-radius: ${scale(10)}px;
  padding: ${scale(10)}px ${scale(12)}px;
  gap: ${verticalScale(4)}px;
`;

export const BookingWindowLabel = styled(Typography)`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SessionDateBadge = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  padding: ${verticalScale(6)}px ${scale(12)}px;
  border-radius: ${scale(8)}px;
  align-self: flex-start;
`;

export const LiveInfoText = styled(Typography)`
  font-style: italic;
`;
