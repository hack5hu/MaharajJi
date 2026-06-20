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
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(20)}px;
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
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const FormCard = styled(Box)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 3;
  gap: ${verticalScale(20)}px;
`;

export const FieldGroup = styled(Box)`
  gap: ${verticalScale(8)}px;
`;

export const OtpInputWrapper = styled(Box)<{ isError?: boolean }>`
  border-width: 1px;
  border-color: ${({ theme, isError }: { theme: ThemeType, isError?: boolean }) => 
    isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(16)}px;
  height: ${scale(56)}px;
  align-items: center;
  justify-content: center;
`;

export const TimerRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: ${verticalScale(4)}px;
`;

export const ResendPressable = styled.Pressable`
  padding-vertical: ${verticalScale(4)}px;
  padding-horizontal: ${scale(8)}px;
`;
