import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  z-index: 40;
  height: ${verticalScale(76)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(20)}px;
`;

export const LeftSection = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AppTitle = styled(Typography)`
  font-weight: 700;
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

export const FiltersWrapper = styled(Box)`
  margin-bottom: ${verticalScale(16)}px;
`;
