import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const CardContainer = styled(Box)<{ highlight?: boolean }>`
  background-color: ${({ theme, highlight }) => highlight ? theme.colors.primary_container : theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme, highlight }) => highlight ? `${theme.colors.primary as string}33` : theme.colors.outline_variant};
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
