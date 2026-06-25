import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@/components/atoms/Button';

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

export const SessionTitle = styled(Typography)`
  font-weight: 700;
`;

export const SlotsText = styled(Typography)`
  font-weight: 600;
`;

export const CounterTextGroup = styled(Box)`
  flex: 1;
  margin-right: ${scale(16)}px;
`;

export const SelectSeatsTitle = styled(Typography)`
  font-weight: 600;
`;

export const SelectSeatsDesc = styled(Typography)`
  margin-top: ${scale(2)}px;
`;

export const CounterNumber = styled(Typography)`
  font-weight: 700;
  min-width: ${scale(24)}px;
  text-align: center;
`;

export const DisclaimerText = styled(Typography)`
  font-style: italic;
  text-align: center;
`;

export const BookSessionDateBadge = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  padding: ${verticalScale(6)}px ${scale(12)}px;
  border-radius: ${scale(8)}px;
  align-self: flex-start;
`;

export const BookSessionWindowContainer = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.tertiary_container || theme.colors.surface_variant};
  border-radius: ${scale(10)}px;
  padding: ${scale(10)}px ${scale(12)}px;
  gap: ${verticalScale(4)}px;
`;

export const BookSessionWindowLabel = styled(Typography)`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StickyFooterRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FooterInfoColumn = styled(Box)`
  flex: 1;
  gap: ${scale(2)}px;
  margin-right: ${scale(16)}px;
`;

export const FooterActionButtonWrapper = styled(Box)`
  width: 100%;
  padding: 0 0 16px 0;
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

export const TotalLabel = styled(Typography)`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TotalValue = styled(Typography)`
  font-weight: 700;
`;

export const SessionOnText = styled(Typography)`
  font-weight: 700;
`;

export const ConfirmButton = styled(Button)`
  background-color: transparent;
`;

export const ErrorBanner = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: #FFEBEE;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.md}px;
  margin-bottom: ${verticalScale(16)}px;
  gap: ${scale(10)}px;
`;

export const ErrorBannerText = styled(Typography)`
  color: #C62828;
  font-weight: 600;
  flex: 1;
`;
