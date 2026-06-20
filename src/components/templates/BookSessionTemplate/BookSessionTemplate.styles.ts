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
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  height: ${verticalScale(76)}px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  gap: ${scale(8)}px;
`;

export const BackButton = styled.Pressable`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
`;
