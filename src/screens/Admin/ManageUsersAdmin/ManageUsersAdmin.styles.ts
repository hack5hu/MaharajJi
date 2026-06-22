import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { EmptyStateContainer as BaseEmptyStateContainer } from '../ManageBookings/ManageBookings.styles';
import { scale, verticalScale } from '@/styles/scaling';

export const ScreenWrapper = styled(Box)`
  flex: 1;
`;

export const StyledEmptyStateContainer = styled(BaseEmptyStateContainer)`
  margin-top: ${verticalScale(40)}px;
`;

export const EmptyStateTitle = styled(Typography)`
  font-weight: 700;
  margin-top: ${scale(16)}px;
`;

export const EmptyStateDesc = styled(Typography)`
  margin-top: ${verticalScale(4)}px;
  text-align: center;
`;

export const ListContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(16)}px;
`;

export const FooterContainer = styled(Box)`
  padding: ${scale(16)}px;
  align-items: center;
`;

export const SearchAndFilterWrapper = styled(Box)`
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
  padding-horizontal: ${scale(16)}px;
  gap: ${scale(12)}px;
`;

export const ScreenTitleWrapper = styled(Box)`
  padding-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;
