import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { AdminBottomNav } from '@/components/organisms/AdminBottomNav';
import { scale, verticalScale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  LeftSection,
  HeaderAvatar,
  ContentContainer,
  HeaderNotificationBtn,
  BottomNavWrapper,
} from './AdminSettingsTemplate.styles';
import { AdminSettingsTemplateProps } from './types.d';

export const AdminSettingsTemplate = React.memo(({
  headerTitle,
  avatarUrl,
  onMenuPress,
  activeTab,
  onTabChange,
  children,
}: AdminSettingsTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <LeftSection>
          {avatarUrl ? (
            <HeaderAvatar source={{ uri: avatarUrl }} />
          ) : null}
          <Typography variant="headline_md" color="primary" style={{ fontWeight: '700' }}>
            {headerTitle}
          </Typography>
        </LeftSection>
        <HeaderNotificationBtn 
          onPress={onMenuPress}
          style={({ pressed }) => ({
            backgroundColor: pressed ? theme.colors.surface_variant : 'transparent',
          })}
        >
          <Bell color={theme.colors.primary as string} size={scale(22)} />
        </HeaderNotificationBtn>
      </HeaderWrapper>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, verticalScale(20)) + verticalScale(100),
        }}
      >
        <ContentContainer>
          {children}
        </ContentContainer>
      </ScrollView>

      <BottomNavWrapper>
        <AdminBottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </BottomNavWrapper>
    </TemplateContainer>
  );
});

AdminSettingsTemplate.displayName = 'AdminSettingsTemplate';
