import React from 'react';
import { View, ViewStyle, Pressable } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles/scaling';

export interface AlertItemProps {
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  variant?: 'error' | 'primary';
  style?: ViewStyle;
}

export const AlertItem = React.memo(({ title, description, timestamp, icon, variant = 'primary', style }: AlertItemProps) => {
  const theme = useTheme() as ThemeType;
  
  const iconBg = variant === 'error' ? theme.colors.error_container : theme.colors.primary_fixed;
  const iconColor = variant === 'error' ? 'on_error_container' : 'on_primary_fixed_variant';

  return (
    <Pressable style={({ pressed }) => [{
      flexDirection: 'row',
      padding: moderateScale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline_variant,
      backgroundColor: pressed ? theme.colors.surface_container_low : 'transparent',
    }, style]}>
      <Box style={{ 
        backgroundColor: iconBg, 
        padding: moderateScale(8), 
        borderRadius: 999, 
        marginRight: scale(16),
        alignSelf: 'flex-start'
      }}>
        <Typography variant="body_lg" color={iconColor as any}>
          {icon}
        </Typography>
      </Box>
      <Box style={{ flex: 1 }}>
        <Typography variant="body_sm" color="on_surface" style={{ fontWeight: '700' }}>
          {title}
        </Typography>
        <Typography variant="body_sm" color="on_surface_variant" style={{ marginVertical: verticalScale(4) }}>
          {description}
        </Typography>
        <Typography variant="label_caps" color="on_surface_variant" style={{ opacity: 0.6 }}>
          {timestamp}
        </Typography>
      </Box>
    </Pressable>
  );
});

AlertItem.displayName = 'AlertItem';
