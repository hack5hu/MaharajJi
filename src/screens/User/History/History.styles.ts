import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const SectionContainer = styled(Box)`
  margin-top: ${verticalScale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const HeaderLabelContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
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
