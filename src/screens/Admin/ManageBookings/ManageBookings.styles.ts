import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';

export const ScreenContainer = styled(Box)`
  flex: 1;
`;

export const EmptyStateContainer = styled(Box)`
  border-width: 2px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  border-radius: ${({ theme }) => theme.rounded.xl}px;
  padding: 24px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
`;

export const EmptyIconWrapper = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
