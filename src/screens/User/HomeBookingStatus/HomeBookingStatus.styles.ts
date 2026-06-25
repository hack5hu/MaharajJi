import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const ScreenContainer = styled(Box)`
  flex: 1;
  
`;

export const WelcomeSection = styled(Box)`
  margin-vertical: ${verticalScale(24)}px;
  gap: ${verticalScale(4)}px;
`;

export const WelcomeTitle = styled(Typography)`
  font-weight: 700;
`;

export const WelcomeSubtitle = styled(Typography)`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface_variant};
`;

export const HeaderLabelContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionTitle = styled(Typography)`
  font-weight: 700;
`;

export const AvailableSlotsTag = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
`;

export const TagLabel = styled(Typography)`
  text-transform: none;
  font-weight: 700;
`;

export const GridContainer = styled(Box)`
  margin-top: ${verticalScale(16)}px;
  flex-direction: row;
  gap: ${scale(16)}px;
  margin-bottom: ${verticalScale(24)}px;
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
  gap: ${verticalScale(8)}px;
  height: ${verticalScale(120)}px;
`;

export const GridLabel = styled(Typography)`
  font-weight: 700;
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

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
`;

export const EmptyStateDesc = styled(Typography)`
  text-align: center;
  line-height: ${verticalScale(20)}px;
`;

export const NotifyButton = styled.Pressable`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  padding-bottom: ${verticalScale(2)}px;
`;

export const NotifyButtonText = styled(Typography)`
  font-weight: 700;
  padding-bottom: ${scale(2)}px;
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

export const ListContainer = styled(Box)`
  flex: 1;
`;
