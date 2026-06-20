import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { Bell, Menu, ArrowLeft, X, Search, ChevronRight } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';

export interface IconButtonProps {
  icon: string;
  size?: number;
  color?: keyof ThemeType['colors'];
  onPress: () => void;
  style?: ViewStyle;
}

export const IconButton = React.memo(({ icon, size = 24, color = 'on_surface', onPress, style }: IconButtonProps) => {
  const theme = useTheme() as ThemeType;
  const actualColor = theme.colors[color] as string;

  const renderIcon = () => {
    switch (icon) {
      case 'notifications': return <Bell color={actualColor} size={size} />;
      case 'menu': return <Menu color={actualColor} size={size} />;
      case 'arrow_back': return <ArrowLeft color={actualColor} size={size} />;
      case 'close': return <X color={actualColor} size={size} />;
      case 'chevron_right': return <ChevronRight color={actualColor} size={size} />;
      default: return <Search color={actualColor} size={size} />;
    }
  };

  return (
    <Pressable onPress={onPress} style={style}>
      {renderIcon()}
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
