import React from 'react';
import { Text, TextProps } from 'react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';

export interface TypographyProps extends TextProps {
  variant?: keyof ThemeType['typography'];
  color?: keyof ThemeType['colors'];
  children: React.ReactNode;
}

export const Typography = React.memo(({ variant = 'body_lg', color = 'on_surface', style, children, ...props }: TypographyProps) => {
  const theme = useTheme() as ThemeType;
  const typographyStyle = theme.typography[variant] as any;
  const colorValue = theme.colors[color];

  return (
    <Text style={[typographyStyle, { color: colorValue }, style]} {...props}>
      {children}
    </Text>
  );
});

Typography.displayName = 'Typography';
