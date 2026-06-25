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

export const StyledScrollView = styled.ScrollView.attrs<{ paddingBottom: number }>(({ paddingBottom }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: verticalScale(20),
    paddingBottom: paddingBottom,
  },
}))`
  flex: 1;
`;

export const FooterContainer = styled(Box)<{ insetsBottom: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${({ insetsBottom }) => Math.max(insetsBottom, verticalScale(16))}px;
  z-index: 50;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 8;
`;

