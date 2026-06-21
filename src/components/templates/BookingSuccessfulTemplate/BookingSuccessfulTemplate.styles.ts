import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  justify-content: center;
  align-items: center;
`;
