import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '@/components/atoms/IconButton';
import { useLocale } from '@/hooks/useLocale';
import { HeaderContainer, LeftSection, AvatarImage } from './AdminHeader.styles';

export interface AdminHeaderProps {
  title: string;
  avatarUrl: string;
  onMenuPress: () => void;
  style?: ViewStyle;
}

export const AdminHeader = React.memo(({ title, avatarUrl, onMenuPress, style }: AdminHeaderProps) => {
  const theme = useTheme() as ThemeType;
  const insets = useSafeAreaInsets();
  const { t } = useLocale();

  return (
    <HeaderContainer insetsTop={insets.top} style={style}>
      <LeftSection>
        {avatarUrl ? (
          <AvatarImage source={{ uri: avatarUrl }} />
        ) : null}
        <Typography variant="headline_md" color="on_surface">
          {title}
        </Typography>
      </LeftSection>
      
      <IconButton 
        icon="notifications" 
        onPress={onMenuPress} 
        color="on_surface_variant" 
      />
    </HeaderContainer>
  );
});

AdminHeader.displayName = 'AdminHeader';
