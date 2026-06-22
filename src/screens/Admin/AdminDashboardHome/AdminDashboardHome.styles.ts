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

export const ButtonSpacer = styled(Box)`
  height: ${verticalScale(16)}px;
`;

export const WelcomeContainer = styled(Box)`
  margin-bottom: ${verticalScale(24)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const InfoCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${scale(20)}px;
  border-radius: ${scale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  margin-top: ${verticalScale(24)}px;
`;

export const DevotionalBanner = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  padding: ${scale(20)}px;
  border-radius: ${scale(16)}px;
  margin-top: ${verticalScale(24)}px;
  align-items: center;
  justify-content: center;
`;

import { Typography } from '@/components/atoms/Typography';

export const WelcomeTitle = styled(Typography)`
  margin-bottom: ${verticalScale(4)}px;
`;

export const WelcomeSubtitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const InfoCardTitle = styled(Typography)`
  margin-bottom: ${verticalScale(8)}px;
  font-weight: 700;
`;

export const InfoCardBody = styled(Typography)`
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${verticalScale(20)}px;
`;

export const DevotionalText = styled(Typography)`
  font-style: italic;
  text-align: center;
  line-height: ${verticalScale(22)}px;
`;
