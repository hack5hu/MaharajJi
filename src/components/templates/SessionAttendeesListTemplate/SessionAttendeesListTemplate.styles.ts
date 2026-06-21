import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const ScreenContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
`;

export const MainContent = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(24)}px;
`;

export const SummaryCard = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 2;
`;

export const SummaryHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SessionInfo = styled(Box)`
  flex: 1;
  padding-right: ${scale(12)}px;
`;

export const DateRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(8)}px;
  gap: ${scale(8)}px;
`;

export const FilledBadge = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;

export const ProgressBarContainer = styled(Box)`
  width: 100%;
  height: ${verticalScale(8)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled(Box)<{ widthPercent: number }>`
  height: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  width: ${({ widthPercent }) => widthPercent}%;
`;

export const SearchContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding-horizontal: ${scale(16)}px;
  height: ${verticalScale(48)}px;
  margin-bottom: ${verticalScale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 1;
`;

export const ListHeader = styled(Box)`
  padding-horizontal: ${scale(4)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const LoaderContainer = styled(Box)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  margin-left: ${scale(12)}px;
  font-family: 'Inter';
  font-size: ${scale(16)}px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface};
  padding-vertical: ${verticalScale(8)}px;
`;

export const ListContainer = styled(Box)`
  flex: 1;
`;

export const EmptyContainer = styled(Box)`
  padding: ${scale(24)}px;
  align-items: center;
`;

