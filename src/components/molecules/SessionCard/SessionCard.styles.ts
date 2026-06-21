import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import FastImage from 'react-native-fast-image';

export const CardContainer = styled.Pressable<{ isPast?: boolean }>`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  border-width: 1px;
  border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  padding: ${scale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 4;
  opacity: ${({ isPast }) => isPast ? 0.7 : 1};
`;

export const CardHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const StatusTag = styled(Box)<{ status: 'active' | 'draft' | 'past' }>`
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, status }: { theme: ThemeType, status: 'active' | 'draft' | 'past' }) => {
    if (status === 'active') return '#e8f5e9'; // soft green
    if (status === 'draft') return '#fff3e0'; // soft orange/amber
    return theme.colors.surface_variant; // grey
  }};
`;

export const TagText = styled.Text<{ status: 'active' | 'draft' | 'past' }>`
  font-size: ${scale(11)}px;
  font-family: 'Inter';
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ status }: { status: 'active' | 'draft' | 'past' }) => {
    if (status === 'active') return '#2e7d32'; // dark green
    if (status === 'draft') return '#ef6c00'; // dark orange
    return '#554336'; // dark grey
  }};
`;

export const SessionTitle = styled(Box)`
  margin-bottom: ${verticalScale(8)}px;
`;

export const DetailsContainer = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  gap: ${scale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const DetailsRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
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
  padding-top: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const AuthorContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const AvatarImage = styled(FastImage)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
`;

export const AvatarFallback = styled(Box)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.outline_variant};
`;

export const ActionButtons = styled(Box)`
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const ActionButton = styled.Pressable<{ isDestructive?: boolean }>`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.lg}px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme, isDestructive }: { theme: ThemeType, isDestructive?: boolean }) => 
    isDestructive ? 'rgba(186, 26, 26, 0.2)' : theme.colors.outline_variant};
  background-color: transparent;
`;
