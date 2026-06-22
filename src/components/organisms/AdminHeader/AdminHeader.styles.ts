import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';

export const HeaderContainer = styled(Box)<{ insetsTop: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 10;
`;

export const LeftSection = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

export const AvatarImage = styled.Image`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  margin-right: ${scale(12)}px;
`;
