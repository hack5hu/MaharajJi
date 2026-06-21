import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { Typography } from '@/components/atoms/Typography';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const EmptyStateContainer = styled(Box)`
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  border-radius: ${({ theme }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
`;

export const StyledEmptyStateContainer = styled(EmptyStateContainer)`
  margin-bottom: ${verticalScale(140)}px;
`;

export const EmptyIconWrapper = styled(Box)`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const ListContainer = styled(Box)`
  flex: 1;
`;

export const FooterContainer = styled(Box)`
  padding: ${scale(16)}px;
  align-items: center;
`;

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
`;

export const EmptyStateDesc = styled(Typography)`
  margin-top: ${verticalScale(4)}px;
  text-align: center;
`;
