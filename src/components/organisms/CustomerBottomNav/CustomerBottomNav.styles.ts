import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const NavContainer = styled(Box)<{ insetsBottom: number }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(10)}px;
  padding-bottom: ${({ insetsBottom }) => Math.max(insetsBottom, verticalScale(10))}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const TabPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const IconContainer = styled(Box)<{ isActive: boolean }>`
  background-color: ${({ isActive }: { isActive: boolean }) => 
    isActive ? 'rgba(255, 153, 51, 0.2)' : 'transparent'}; /* primary_container / saffron background opacity */
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
  margin-bottom: ${verticalScale(4)}px;
  align-items: center;
  justify-content: center;
`;
