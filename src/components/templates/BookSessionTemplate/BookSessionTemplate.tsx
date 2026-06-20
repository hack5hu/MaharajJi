import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  BackButton,
  ContentContainer,
} from './BookSessionTemplate.styles';
import { BookSessionTemplateProps } from './types.d';

export const BookSessionTemplate = React.memo(({
  headerTitle,
  onBackPress,
  children,
}: BookSessionTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <BackButton 
          onPress={onBackPress}
          style={({ pressed }) => ({
            backgroundColor: pressed ? theme.colors.surface_variant : 'transparent',
          })}
        >
          <ArrowLeft color={theme.colors.primary as string} size={scale(22)} />
        </BackButton>
        <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
          {headerTitle}
        </Typography>
      </HeaderWrapper>

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: verticalScale(20),
          paddingBottom: Math.max(insets.bottom, verticalScale(20)) + verticalScale(20),
        }}
      >
        <ContentContainer>
          {children}
        </ContentContainer>
      </ScrollView>
    </TemplateContainer>
  );
});

BookSessionTemplate.displayName = 'BookSessionTemplate';
