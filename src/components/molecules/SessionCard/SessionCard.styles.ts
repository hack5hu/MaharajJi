import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const CardContainer = styled.Pressable<{ isPast?: boolean }>`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-radius: ${moderateScale(24)}px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  padding: ${scale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 20px;
  elevation: 3;
  opacity: ${({ isPast }) => isPast ? 0.65 : 1};
`;

export const CardHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const StatusTag = styled(Box)<{ status: 'active' | 'archive'; theme: ThemeType }>`
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, status }) => {
    if (status === 'active') return theme.colors.primary_container;
    return theme.colors.surface_container_highest;
  }};
`;

export const TagText = styled.Text<{ status: 'active' | 'archive'; theme: ThemeType }>`
  font-size: ${scale(10)}px;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme, status }) => {
    if (status === 'active') return theme.colors.on_primary_container;
    return theme.colors.on_surface_variant;
  }};
`;

export const SessionTitle = styled(Box)`
  margin-bottom: ${verticalScale(12)}px;
`;

export const DetailsContainer = styled(Box)`
  flex-direction: column;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(20)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.secondary_container};
  padding: ${scale(16)}px;
  border-radius: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const DetailsRow = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

export const DetailsLeft = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const DetailsValue = styled(Box)`
  flex: 1;
  align-items: flex-end;
`;

export const Divider = styled(Box)`
  width: 1px;
  height: ${verticalScale(12)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  margin-horizontal: ${scale(8)}px;
`;

export const CardFooter = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${verticalScale(12)}px;
`;

export const AuthorContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const AvatarImage = styled(FastImage)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(16)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_high};
`;

export const AvatarFallback = styled(Box)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(16)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_high};
`;

export const ActionButtons = styled(Box)`
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const ActionButton = styled.Pressable<{ isDestructive?: boolean; theme: ThemeType }>`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${({ theme }) => theme.rounded.xl}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isDestructive }) => 
    isDestructive ? theme.colors.error_container : theme.colors.surface_container_high};
`;

