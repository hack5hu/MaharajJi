import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';


export const Container = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const HeaderWrapper = styled(Box)<{ paddingTop: number }>`
  padding-top: ${({ paddingTop }) => paddingTop}px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 50;
`;



export const MainContent = styled(Box)`
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(120)}px;
  padding-horizontal: ${scale(20)}px;
`;

export const ProgressWrapper = styled(Box)`
  width: 100%;
  height: ${verticalScale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  margin-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(32)}px;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled(Box)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary_container};
  width: 66.66%;
`;

export const TitleContainer = styled(Box)`
  margin-bottom: ${verticalScale(24)}px;
`;

export const FormContainer = styled(Box)`
  gap: ${verticalScale(24)}px;
`;

export const StickyActionsContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${scale(20)}px;
  background-color: rgba(251, 249, 249, 0.9);
  flex-direction: column;
  gap: ${verticalScale(8)}px;
  shadow-color: #000;
  shadow-offset: 0px -8px;
  shadow-opacity: 0.05;
  shadow-radius: 24px;
  elevation: 10;
`;
