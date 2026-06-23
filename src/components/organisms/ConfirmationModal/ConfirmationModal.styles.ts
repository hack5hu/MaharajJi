import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const ModalBackdrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  z-index: 9999;
`;

export const ModalContainer = styled(Box)`
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${scale(24)}px;
  align-items: center;
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 5;
`;

export const IconWrapper = styled(Box)`
  width: ${scale(56)}px;
  height: ${scale(56)}px;
  border-radius: ${moderateScale(28)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.error_container};
  justify-content: center;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const TextContainer = styled(Box)`
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const ButtonContainer = styled(Box)`
  width: 100%;
  gap: ${verticalScale(12)}px;
`;
