import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
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

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(24)}px;
`;

export const FormCard = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  padding: ${scale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 2;
  gap: ${verticalScale(20)}px;
`;

export const FieldGroup = styled(Box)`
  gap: ${verticalScale(8)}px;
`;

export const PhoneInputContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  width: 100%;
`;

export const CountryCodeSelector = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${scale(80)}px;
  height: ${scale(56)}px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(12)}px;
`;

export const InfoContainer = styled(Box)`
  flex-direction: row;
  align-items: start;
  gap: ${scale(12)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  padding: ${scale(16)}px;
`;

export const ButtonContainer = styled(Box)`
  flex-direction: column;
  gap: ${verticalScale(12)}px;
  margin-top: ${verticalScale(12)}px;
`;
