import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';

export const HeroContainer = styled(Box)`
  flex-direction: column;
`;

export const StatusCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
  margin-bottom: ${verticalScale(16)}px;
`;

export const StatusHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(24)}px;
`;

export const StatusBadgeContainer = styled(Box)<{ isOpen: boolean }>`
  background-color: ${({ theme, isOpen }) => isOpen ? theme.colors.primary : theme.colors.error};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
`;

export const ToggleButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.on_surface};
  padding-vertical: ${verticalScale(12)}px;
  padding-horizontal: ${scale(16)}px;
  border-radius: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const QuickActionsCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
`;

export const PrimaryActionButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SecondaryActionsContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;

export const SecondaryActionButton = styled.Pressable<{ isLeft?: boolean }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  margin-right: ${({ isLeft }) => isLeft ? scale(8) : 0}px;
  margin-left: ${({ isLeft }) => isLeft ? 0 : scale(8)}px;
`;
