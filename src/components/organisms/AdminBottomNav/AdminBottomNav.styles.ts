import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';

export const NavContainer = styled(Box)<{ insetsBottom: number }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(8)}px;
  padding-bottom: ${({ insetsBottom }) => Math.max(insetsBottom, verticalScale(8))}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px -2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  elevation: 4;
`;

export const TabPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(4)}px;
`;

export const IconContainer = styled(Box)<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary_container : 'transparent'};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
  margin-bottom: ${verticalScale(4)}px;
`;
