import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Typography } from '../Typography';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';

export interface StatusBadgeProps {
  label: string;
  type?: 'live' | 'trend' | 'default';
  style?: ViewStyle;
}

export const StatusBadge = React.memo(({ label, type = 'default', style }: StatusBadgeProps) => {
  const theme = useTheme() as ThemeType;
  
  let bgColor: string = theme.colors.surface_container;
  let textColor: string = theme.colors.on_surface_variant;
  let textVariant: keyof ThemeType['typography'] = 'label_caps';
  
  if (type === 'live') {
    bgColor = theme.colors.primary;
    textColor = theme.colors.on_primary;
  } else if (type === 'trend') {
    bgColor = 'transparent';
    textColor = theme.colors.secondary;
    textVariant = 'status_label';
  }

  return (
    <View style={[{
      backgroundColor: bgColor,
      paddingHorizontal: type === 'trend' ? 0 : 8,
      paddingVertical: type === 'trend' ? 0 : 2,
      borderRadius: type === 'live' ? 999 : 4,
    }, style]}>
      <Typography variant={textVariant} style={{ color: textColor }}>
        {label}
      </Typography>
    </View>
  );
});

StatusBadge.displayName = 'StatusBadge';
