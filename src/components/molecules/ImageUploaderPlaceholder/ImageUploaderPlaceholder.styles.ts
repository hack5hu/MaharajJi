import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const UploadContainer = styled(TouchableOpacity)`
  width: 100%;
  height: ${verticalScale(160)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_high};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const IconWrapper = styled.View`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 9999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
`;

export const EditOverlay = styled.View`
  position: absolute;
  top: ${scale(8)}px;
  right: ${scale(8)}px;
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;
