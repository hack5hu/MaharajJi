import React from 'react';
import { ViewStyle } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '@/components/atoms/IconButton';
import { scale } from '@/styles/scaling';
import { HeaderContainer, LeftSection, AvatarImage } from './AdminHeader.styles';

export interface AdminHeaderProps {
  title: string;
  avatarUrl?: string;
  onMenuPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  style?: ViewStyle;
}

export const AdminHeader = React.memo(({ title, avatarUrl, onMenuPress, showBackButton, onBackPress, style }: AdminHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <HeaderContainer insetsTop={insets.top} style={style}>
      <LeftSection>
        {showBackButton && onBackPress ? (
          <IconButton
            icon="arrow_back"
            onPress={onBackPress}
            style={{ marginRight: scale(12) }}
          />
        ) : (
          avatarUrl ? <AvatarImage source={{ uri: avatarUrl }} /> : null
        )}
        <Typography variant="headline_md" color="on_surface">
          {title}
        </Typography>
      </LeftSection>
      
      {!showBackButton && onMenuPress && (
        <IconButton
          icon="menu"
          onPress={onMenuPress}
        />
      )}
    </HeaderContainer>
  );
});

AdminHeader.displayName = 'AdminHeader';
