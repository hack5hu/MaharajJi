import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';
import { ImageBackground } from 'react-native';

export const CardContainer = styled(Box)`
  height: ${verticalScale(256)}px;
  border-radius: ${moderateScale(16)}px;
  overflow: hidden;
`;

export const StyledImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

export const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
`;

export const BadgeContainer = styled(Box)`
  position: absolute;
  top: ${verticalScale(16)}px;
  right: ${scale(16)}px;
  background-color: rgba(255,255,255,0.25);
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: 999px;
`;

export const ContentContainer = styled(Box)`
  padding: ${moderateScale(24)}px;
`;
