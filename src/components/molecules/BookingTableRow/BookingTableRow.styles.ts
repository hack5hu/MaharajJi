import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';

export const RowContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant};
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const CustomerCell = styled(Box)`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
`;

export const AvatarContainer = styled(Box)<{ bgColor: string }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ bgColor }) => bgColor};
  justify-content: center;
  align-items: center;
  margin-right: ${scale(12)}px;
`;

export const ServiceCell = styled(Box)`
  flex: 1;
  justify-content: center;
`;

export const DateCell = styled(Box)`
  flex: 1;
  justify-content: center;
`;

export const StatusCell = styled(Box)`
  flex: 0.8;
  justify-content: center;
  align-items: flex-start;
`;
