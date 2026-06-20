import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const StyledScrollView = styled.ScrollView``;

export const BottomNavWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
