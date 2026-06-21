import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

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
  background-color: ${({ theme, isConfirmed }: { theme: ThemeType; isConfirmed: boolean }) =>
    isConfirmed ? '#E8F5E9' : theme.colors.surface_variant};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
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

export const LocationRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(12)}px;
`;

export const ActionButtonsWrapper = styled(Box)`
  padding: ${scale(16)}px;
  padding-top: 0px;
  gap: ${verticalScale(8)}px;
`;

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  margin-vertical: ${verticalScale(24)}px;
`;

export const FilterButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const HistoryList = styled(Box)`
  gap: ${verticalScale(12)}px;
`;

export const HistoryCard = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  padding: ${scale(16)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.md}px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const HistoryLeft = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const HistoryIconContainer = styled(Box)`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_highest};
  align-items: center;
  justify-content: center;
`;

export const HistoryTextInfo = styled(Box)`
  flex-direction: column;
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const HistoryBadge = styled(Box)<{ isCompleted: boolean }>`
  background-color: ${({ theme, isCompleted }: { theme: ThemeType; isCompleted: boolean }) =>
    isCompleted ? theme.colors.surface_variant : theme.colors.error_container};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const LoadMoreBtn = styled.Pressable`
  width: 100%;
  margin-top: ${verticalScale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(8)}px;
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

export const LoadingOverlay = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(48)}px;
`;
