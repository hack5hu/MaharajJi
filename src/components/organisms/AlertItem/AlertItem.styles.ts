import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const AlertContainer = styled(Pressable)<{ theme: ThemeType }>`
  flex-direction: row;
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant};
  background-color: transparent;
`;

export const IconContainer = styled(Box)<{ iconBg: string }>`
  background-color: ${({ iconBg }) => iconBg};
  padding: ${moderateScale(8)}px;
  border-radius: 999px;
  margin-right: ${scale(16)}px;
  align-self: flex-start;
`;

export const ContentContainer = styled(Box)`
  flex: 1;
`;

export const TitleText = styled(Typography)`
  font-weight: 700;
`;

export const DescriptionText = styled(Typography)`
  margin-vertical: ${verticalScale(4)}px;
`;

export const TimestampText = styled(Typography)`
  opacity: 0.6;
`;
