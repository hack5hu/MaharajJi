import styled from 'styled-components/native';
import { Pressable, ScrollView } from 'react-native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const DebuggerWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: box-none;
`;

export const FloatingTrigger = styled(Pressable)`
  position: absolute;
  bottom: ${verticalScale(96)}px;
  left: ${scale(24)}px;
  width: ${scale(50)}px;
  height: ${scale(50)}px;
  border-radius: 999px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.inverse_surface};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 8;
  z-index: 99999;
`;

export const FullscreenOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  z-index: 99999;
`;

export const PanelContent = styled(Box)`
  width: 100%;
  height: 80%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(24)}px;
  border-top-right-radius: ${moderateScale(24)}px;
  padding: ${scale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 16;
`;

export const PanelHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const HeaderActions = styled(Box)`
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ClearButton = styled(Pressable)`
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_high};
`;

export const CloseButton = styled(Pressable)`
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.error_container};
`;

export const LogsScrollView = styled(ScrollView)`
  flex: 1;
`;

export const LogCard = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(12)}px;
  padding: ${scale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const LogRow = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LogInfo = styled(Box)`
  flex: 1;
  margin-horizontal: ${scale(8)}px;
  gap: ${verticalScale(2)}px;
`;

export const BadgesContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const MethodBadge = styled(Box)<{ method: string }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, method }: { theme: ThemeType; method: string }) => {
    if (method === 'GET') return theme.colors.secondary_container;
    if (method === 'POST') return theme.colors.primary_container;
    return theme.colors.tertiary_container;
  }};
`;

export const StatusBadge = styled(Box)<{ status?: number }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
  background-color: ${({ theme, status }: { theme: ThemeType; status?: number }) => {
    if (!status) return theme.colors.surface_variant;
    if (status >= 200 && status < 300) return '#e8f5e9'; // Light Green
    if (status >= 400) return '#ffebee'; // Light Red
    return '#fff8e1'; // Light Yellow
  }};
`;

export const LogExpandedArea = styled(Box)`
  margin-top: ${verticalScale(12)}px;
  padding-top: ${verticalScale(12)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_variant};
  gap: ${verticalScale(10)}px;
`;

export const JSONBlock = styled(Box)`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.inverse_surface};
  border-radius: ${moderateScale(8)}px;
  padding: ${scale(10)}px;
  max-height: ${verticalScale(180)}px;
`;

export const JSONScroll = styled(ScrollView)`
  flex-grow: 0;
`;

export const EmptyStateWrapper = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(12)}px;
`;
