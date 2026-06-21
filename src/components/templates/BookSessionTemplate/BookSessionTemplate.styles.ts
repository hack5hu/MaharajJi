import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  z-index: 40;
`;

export const BackPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const HeaderContainer = styled(Box)`
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${verticalScale(4)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
`;

export const StyledScrollView = styled.ScrollView.attrs<{ insetsBottom: number }>(({ insetsBottom }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: verticalScale(20),
    paddingBottom: Math.max(insetsBottom, verticalScale(20)) + verticalScale(20),
  },
}))`
  flex: 1;
`;
