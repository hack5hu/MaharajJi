import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

/* ── Full-screen container ─────────────────────────────────── */

export const TemplateContainer = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
`;

/* ── Top hero / brand area ─────────────────────────────────── */

export const HeroSection = styled(Box)`
  align-items: center;
  justify-content: center;
  padding-top: ${verticalScale(72)}px;
  padding-bottom: ${verticalScale(40)}px;
  padding-horizontal: ${scale(32)}px;
  gap: ${verticalScale(16)}px;
`;

export const LogoCircle = styled(Box)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border-radius: ${scale(40)}px;
  background-color: rgba(255, 255, 255, 0.25);
  align-items: center;
  justify-content: center;
  shadow-color: rgba(0, 0, 0, 0.15);
  shadow-offset: 0px ${verticalScale(4)}px;
  shadow-opacity: 1;
  shadow-radius: ${moderateScale(16)}px;
  elevation: 8;
`;

export const LogoInner = styled(Box)`
  width: ${scale(64)}px;
  height: ${scale(64)}px;
  border-radius: ${scale(32)}px;
  background-color: rgba(255, 255, 255, 0.9);
  align-items: center;
  justify-content: center;
`;

export const LogoEmoji = styled.Text`
  font-size: ${responsiveFont(32)}px;
`;

export const BrandName = styled.Text`
  font-family: Inter;
  font-size: ${responsiveFont(26)}px;
  font-weight: 800;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_primary_fixed};
  text-align: center;
  letter-spacing: ${scale(-0.5)}px;
  line-height: ${verticalScale(34)}px;
`;

export const BrandTagline = styled.Text`
  font-family: Inter;
  font-size: ${responsiveFont(14)}px;
  font-weight: 500;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_primary_fixed_variant};
  text-align: center;
  opacity: 0.8;
`;

/* ── Bottom form card ──────────────────────────────────────── */

export const FormCard = styled(Box)`
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(32)}px;
  border-top-right-radius: ${moderateScale(32)}px;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(32)}px;
  padding-bottom: ${verticalScale(24)}px;
  gap: ${verticalScale(20)}px;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 0px ${verticalScale(-4)}px;
  shadow-opacity: 1;
  shadow-radius: ${moderateScale(24)}px;
  elevation: 12;
`;

export const FormTitle = styled.Text`
  font-family: Inter;
  font-size: ${responsiveFont(20)}px;
  font-weight: 700;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface};
  letter-spacing: ${scale(-0.3)}px;
`;

export const FormSubtitle = styled.Text`
  font-family: Inter;
  font-size: ${responsiveFont(14)}px;
  font-weight: 400;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(-16)}px;
`;

/* ── Phone input ───────────────────────────────────────────── */

export const FieldGroup = styled(Box)`
  gap: ${verticalScale(8)}px;
`;

export const PhoneInputWrapper = styled(Box)<{ isError?: boolean; disabled?: boolean }>`
  flex-direction: row;
  align-items: center;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(16)}px;
  height: ${verticalScale(56)}px;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const CountryCode = styled(Box)`
  padding-right: ${scale(12)}px;
  margin-right: ${scale(12)}px;
  justify-content: center;
  height: 100%;
`;

export const InputTapOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

/* ── Restriction info row ──────────────────────────────────── */

export const InfoSection = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const LockIconWrapper = styled(Box)`
  padding: ${moderateScale(8)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
`;

/* ── Truecaller row ────────────────────────────────────────── */

export const TruecallerRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(8)}px;
  gap: ${scale(4)}px;
`;

export const TruecallerLabel = styled.Text`
  font-family: Inter;
  font-size: ${responsiveFont(14)}px;
  font-weight: 700;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
`;

/* ── Divider ───────────────────────────────────────────────── */

export const DividerRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const DividerLine = styled(Box)`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

/* ── Help footer ───────────────────────────────────────────── */

export const HelpButton = styled.TouchableOpacity`
  align-self: center;
  padding: ${verticalScale(4)}px;
`;
