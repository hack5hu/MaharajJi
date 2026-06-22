import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
`;

export const BackgroundDecorations = styled(Box)`
  position: absolute;
  inset: 0;
  opacity: 0.15;
  z-index: 0;
`;

export const InnerWrapper = styled(Box)`
  width: 100%;
  align-items: center;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(80)}px;
  padding-bottom: ${verticalScale(40)}px;
  z-index: 10;
`;

export const BrandSection = styled(Box)`
  align-items: center;
  margin-bottom: ${verticalScale(32)}px;
  gap: ${verticalScale(12)}px;
`;

export const LogoCircle = styled(Box)`
  width: ${scale(64)}px;
  height: ${scale(64)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.35;
  shadow-radius: 12px;
  elevation: 6;
`;

export const FormCard = styled(Box)`
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
  gap: ${verticalScale(20)}px;
`;

export const FieldGroup = styled(Box)`
  gap: ${verticalScale(12)}px;
`;

export const TimerRow = styled(Box)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ResendPressable = styled.Pressable<{ disabled?: boolean }>`
  padding-vertical: ${verticalScale(4)}px;
  padding-horizontal: ${scale(8)}px;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const DecorationCircle = styled(Box)<{ size: number; posTop?: number; posLeft?: number; posBottom?: number; posRight?: number }>`
  width: ${({ size }) => scale(size)}px;
  height: ${({ size }) => scale(size)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_fixed};
  opacity: 0.12;
  position: absolute;
  top: ${({ posTop }) => posTop !== undefined ? scale(posTop) : 'auto'}px;
  left: ${({ posLeft }) => posLeft !== undefined ? scale(posLeft) : 'auto'}px;
  bottom: ${({ posBottom }) => posBottom !== undefined ? scale(posBottom) : 'auto'}px;
  right: ${({ posRight }) => posRight !== undefined ? scale(posRight) : 'auto'}px;
`;
