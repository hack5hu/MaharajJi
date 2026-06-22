import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';

export const TableContainer = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  overflow: hidden;
`;

export const TableHeaderContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
`;

export const TableColumnsContainer = styled(Box)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

export const ScrollContentContainer = styled(Box)`
  min-width: ${scale(600)}px;
`;
