import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';

export interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: keyof ThemeType['colors'];
  trackColor?: keyof ThemeType['colors'];
  style?: ViewStyle;
}

export const ProgressBar = React.memo(({ progress, color = 'primary', trackColor = 'surface_container_highest', style }: ProgressBarProps) => {
  const theme = useTheme() as ThemeType;
  
  return (
    <View style={[{ height: 6, backgroundColor: theme.colors[trackColor], borderRadius: 999, overflow: 'hidden' }, style]}>
      <View style={{ height: '100%', width: `${Math.max(0, Math.min(100, progress * 100))}%`, backgroundColor: theme.colors[color], borderRadius: 999 }} />
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';
