import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';

export const ContentContainer = styled(Box)`
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(24)}px;
`;

export const BentoGridContainer = styled(Box)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${verticalScale(32)}px;
`;

export const BentoHalfColumn = styled(Box)`
  width: 48%;
  margin-bottom: ${verticalScale(16)}px;
`;

export const BentoFullColumn = styled(Box)`
  width: 100%;
`;

export const ProgressLabelContainer = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${verticalScale(4)}px;
`;
