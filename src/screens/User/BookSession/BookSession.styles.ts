import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const ScreenContainer = styled(Box)`
  flex: 1;
  width: 100%;
`;

export const SessionCard = styled(Box)`
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
  margin-bottom: ${verticalScale(20)}px;
`;

export const CardBannerImage = styled(FastImage)`
  height: ${verticalScale(140)}px;
  width: 100%;
`;

export const SessionCardBody = styled(Box)`
  padding: ${scale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const DetailsRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const DetailItem = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const CounterSection = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 3;
  gap: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(20)}px;
`;

export const CounterRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CounterControls = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(20)}px;
`;

export const CircularButton = styled.Pressable<{ disabled?: boolean }>`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: 999px;
  background-color: ${({ theme, disabled }: { theme: ThemeType; disabled?: boolean }) =>
    disabled ? theme.colors.surface_variant : theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const TokensBox = styled(Box)`
  padding: ${scale(12)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DisclaimerBox = styled(Box)`
  padding-horizontal: ${scale(4)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ButtonWrapper = styled(Box)`
  width: 100%;
`;

export const PageTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: ${verticalScale(20)}px;
`;
