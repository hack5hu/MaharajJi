import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const AttendeeCardContainer = styled.Pressable<{ isWaitlisted?: boolean }>`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(16)}px;
  opacity: ${({ isWaitlisted }) => (isWaitlisted ? 0.75 : 1)};
  shadow-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 2;
`;

export const AttendeeInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const AvatarInitials = styled(Box)<{ bgColor: string }>`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 9999px;
  background-color: ${({ bgColor }) => bgColor};
  align-items: center;
  justify-content: center;
  margin-right: ${scale(16)}px;
`;

export const InitialsText = styled(Typography)<{ initialsColor: string }>`
  font-weight: 700;
  color: ${({ initialsColor }) => initialsColor};
`;

export const AttendeeDetails = styled(Box)`
  flex: 1;
`;

export const AttendeeNameText = styled(Typography)`
  font-size: ${scale(18)}px;
`;

export const AttendeeStatus = styled(Box)`
  align-items: flex-end;
`;

export const BookingIdText = styled(Typography)`
  margin-top: ${verticalScale(4)}px;
`;
