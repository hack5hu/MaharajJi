import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.background};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.surface};
  z-index: 40;
  margin-bottom: 20px;
`;

export const ContentContainer = styled(Box)<{ paddingTop?: number }>`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  ${({ paddingTop }) =>
    paddingTop ? `padding-top: ${paddingTop + verticalScale(16)}px;` : ''}
`;

export const TitleAndButtonRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${verticalScale(24)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const TitleWrapper = styled(Box)`
  flex: 1;
  margin-right: ${scale(12)}px;
`;

export const FiltersWrapper = styled(Box)`
  margin-bottom: ${verticalScale(20)}px;
`;

export const ListContainer = styled(Box)`
  flex: 1;
`;
