import React from 'react';
import { Pressable, ViewStyle, ActivityIndicator } from 'react-native';
import { Typography } from '../Typography';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles/scaling';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textColor?: keyof ThemeType['colors'];
}

export const Button = React.memo(({ label, onPress, variant = 'primary', fullWidth, loading, disabled, style, textColor }: ButtonProps) => {
  const theme = useTheme() as ThemeType;

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surface_dim;
    return variant === 'primary' ? theme.colors.primary : theme.colors.surface_container;
  };

  const getTextColor = (): keyof ThemeType['colors'] => {
    if (disabled) return 'on_surface_variant';
    if (textColor) return textColor;
    return variant === 'primary' ? 'on_primary' : 'primary';
  };

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [{
        backgroundColor: getBackgroundColor(),
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(24),
        borderRadius: moderateScale(12),
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        opacity: pressed && !disabled ? 0.8 : 1,
      }, style]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[getTextColor()]} />
      ) : (
        <Typography variant="body_lg" color={getTextColor()} style={{ fontWeight: '700' }}>
          {label}
        </Typography>
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';
