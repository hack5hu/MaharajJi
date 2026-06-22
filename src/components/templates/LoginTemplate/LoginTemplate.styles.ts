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
  margin-bottom: ${verticalScale(16)}px;
  gap: ${verticalScale(8)}px;
`;

export const LogoCircle = styled(Box)`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.35;
  shadow-radius: 8px;
  elevation: 4;
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

export const PhoneInputWrapper = styled(Box)<{ isError?: boolean; disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  border-width: ${({ isError }: { isError?: boolean }) => isError ? 1 : 0}px;
  border-color: ${({ theme, isError }: { theme: ThemeType, isError?: boolean }) => 
    isError ? theme.colors.error : 'transparent'};
  border-radius: ${scale(12)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(16)}px;
  height: ${scale(56)}px;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const CountryCode = styled(Box)`
  padding-right: ${scale(12)}px;
  margin-right: ${scale(12)}px;
  justify-content: center;
  height: 100%;
`;

export const InfoSection = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const HelpButton = styled.TouchableOpacity`
  align-self: center;
  padding: ${verticalScale(4)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const InputTapOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

export const TruecallerRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(4)}px;
  gap: ${scale(4)}px;
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
