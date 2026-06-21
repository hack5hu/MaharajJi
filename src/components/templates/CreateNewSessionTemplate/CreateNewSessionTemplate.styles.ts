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
  padding-horizontal: ${scale(20)}px;
  padding-bottom: ${verticalScale(80)}px;
  flex: 1;
`;



export const TitleContainer = styled(Box)`
  margin-bottom: ${verticalScale(24)}px;
`;

export const FormContainer = styled(Box)`
  gap: ${verticalScale(24)}px;
`;

export const ActionsContainer = styled(Box)`
  padding: ${scale(20)}px;
  padding-bottom: ${scale(40)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  flex-direction: column;
  gap: ${verticalScale(8)}px;
  margin-top: auto;
`;
