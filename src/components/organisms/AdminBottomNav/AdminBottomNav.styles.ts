import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';

export const NavContainer = styled(Box)<{ insetsBottom: number }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: ${scale(8)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${({ insetsBottom }) => Math.max(insetsBottom, verticalScale(12))}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 8;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.surface_variant}40;
`;

export const TabPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const IconContainer = styled(Box)<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary_container : 'transparent'};
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 999px;
  margin-bottom: ${verticalScale(6)}px;
  align-items: center;
  justify-content: center;
`;
