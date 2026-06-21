import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const SectionContainer = styled(Box)`
  margin-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const HeaderLabelContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const StatusTag = styled(Box)<{ isConfirmed: boolean }>`
  background-color: ${({ isConfirmed }) => (isConfirmed ? '#E8F5E9' : '#f5f3f3')};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
`;

export const ConfirmedStatusText = styled(Typography)`
  color: #2E7D32;
  font-weight: 700;
  text-transform: none;
`;

export const ActiveCard = styled(Box)`
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

export const ActiveImageContainer = styled(Box)`
  height: ${verticalScale(180)}px;
  width: 100%;
  position: relative;
`;

export const CardBannerImage = styled(FastImage)`
  height: 100%;
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
`;

export const ContentSplitRow = styled(Box)`
  flex-direction: row;
  gap: ${scale(16)}px;
  align-items: center;
`;

export const DetailsGrid = styled(Box)`
  flex: 1;
  gap: ${verticalScale(16)}px;
`;

export const GridRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;

export const GridCol = styled(Box)`
  flex: 1;
`;

export const DetailsLabelText = styled(Typography)`
  font-weight: 700;
  margin-bottom: ${verticalScale(2)}px;
`;

export const DetailsValueText = styled(Typography)`
  font-weight: 700;
`;

export const LocationRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(12)}px;
`;

export const LocationText = styled(Typography)`
  font-weight: 500;
  flex: 1;
`;

export const QRWrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  padding: ${scale(8)}px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${moderateScale(8)}px;
`;

export const QRCodeImage = styled(FastImage)`
  width: ${scale(96)}px;
  height: ${scale(96)}px;
`;

export const ScanText = styled.Text`
  font-family: 'Inter';
  font-size: 9px;
  font-weight: 700;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  margin-top: ${verticalScale(4)}px;
  letter-spacing: 1px;
  text-align: center;
`;

export const ActionButtonsWrapper = styled(Box)`
  padding: ${scale(16)}px;
  padding-top: 0px;
  gap: ${verticalScale(8)}px;
`;

export const StyledButton = styled(Button)`
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  padding-vertical: ${verticalScale(14)}px;
`;

export const SuccessBanner = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: #E8F5E9;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.md}px;
  margin-bottom: ${verticalScale(16)}px;
  gap: ${scale(10)}px;
`;

export const SuccessBannerText = styled(Typography)`
  color: #2E7D32;
  font-weight: 600;
  flex: 1;
`;

export const EmptyStateWrapper = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding-vertical: ${verticalScale(36)}px;
  padding-horizontal: ${scale(24)}px;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(12)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const EmptyIconCircle = styled(Box)`
  width: ${scale(64)}px;
  height: ${scale(64)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(8)}px;
`;

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
`;

export const EmptyStateDesc = styled(Typography)`
  text-align: center;
  line-height: ${verticalScale(20)}px;
`;

export const LoadingOverlay = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(48)}px;
`;
