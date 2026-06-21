import React from 'react';
import { ViewStyle } from 'react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { 
  AlertContainer, 
  IconContainer, 
  ContentContainer, 
  TitleText, 
  DescriptionText, 
  TimestampText 
} from './AlertItem.styles';

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
    <AlertContainer 
      style={({ pressed }) => [
        { backgroundColor: pressed ? theme.colors.surface_container_low : 'transparent' },
        style
      ]}
    >
      <IconContainer iconBg={iconBg as string}>
        <TitleText variant="body_lg" color={iconColor as any}>
          {icon}
        </TitleText>
      </IconContainer>
      <ContentContainer>
        <TitleText variant="body_sm" color="on_surface">
          {title}
        </TitleText>
        <DescriptionText variant="body_sm" color="on_surface_variant">
          {description}
        </DescriptionText>
        <TimestampText variant="label_caps" color="on_surface_variant">
          {timestamp}
        </TimestampText>
      </ContentContainer>
    </AlertContainer>
  );
});

AlertItem.displayName = 'AlertItem';
