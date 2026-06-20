import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';

export const TableContainer = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  overflow: hidden;
`;

export const TableHeaderContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const TableColumnsContainer = styled(Box)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const ScrollContentContainer = styled(Box)`
  min-width: ${scale(600)}px;
`;
