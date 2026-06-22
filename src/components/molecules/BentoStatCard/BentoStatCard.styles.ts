import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, verticalScale } from '@/styles/scaling';

export const CardContainer = styled(Box)<{ highlight?: boolean }>`
  background-color: ${({ theme, highlight }) => highlight ? theme.colors.primary_container : theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
  justify-content: space-between;
  flex: 1;
`;

export const HeaderContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ContentContainer = styled(Box)`
  flex-direction: column;
`;
