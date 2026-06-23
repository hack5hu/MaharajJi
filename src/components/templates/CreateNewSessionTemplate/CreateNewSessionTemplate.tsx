import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  KeyboardAwareScrollView,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';
import { useLocale } from '@/hooks/useLocale';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { Typography } from '@/components/atoms/Typography';
import {
  Container,
  HeaderWrapper,
  MainContent,
  TitleContainer,
  FormContainer,
  ActionsContainer,
  HeaderContent,
  BackPressable,
} from './CreateNewSessionTemplate.styles';

export interface CreateNewSessionTemplateProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onCancelPress: () => void;
}

export const CreateNewSessionTemplate = React.memo(
  ({
    title,
    subtitle,
    children,
    actions,
    onCancelPress,
  }: CreateNewSessionTemplateProps) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme() as ThemeType;
    const { t } = useLocale();

    // Track the button height so the ScrollView knows how far to push the focused input
    const [actionsHeight, setActionsHeight] = useState(0);

    // Hook into the keyboard's height
    const { height: keyboardHeight } = useReanimatedKeyboardAnimation();

    // FIX: Animate 'bottom' instead of 'transform'.
    // This triggers a true layout recalculation on Android, preventing the "stuck" rendering bug.
    const animatedFooterStyle = useAnimatedStyle(() => {
      return {
        // keyboardHeight.value is negative when open. Math.abs makes it positive to push the bottom up.
        bottom: Math.abs(keyboardHeight.value),
      };
    });

    return (
      <Container style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <HeaderWrapper paddingTop={insets.top}>
          <HeaderContent>
            <BackPressable onPress={onCancelPress}>
              <ArrowLeft
                color={theme.colors.primary as string}
                size={scale(18)}
              />
              <Typography variant="label_caps" color="primary">
                {t('common.back', { defaultValue: 'GO BACK' })}
              </Typography>
            </BackPressable>
          </HeaderContent>
        </HeaderWrapper>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={actionsHeight + verticalScale(20)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: actionsHeight + verticalScale(16),
          }}
        >
          <MainContent>
            <TitleContainer>
              <Typography
                variant="headline_lg"
                color="on_surface"
                style={{ fontWeight: '700' }}
              >
                {title}
              </Typography>
              <Typography
                variant="body_sm"
                color="on_surface_variant"
                style={{ marginTop: 4 }}
              >
                {subtitle}
              </Typography>
            </TitleContainer>

            <FormContainer>{children}</FormContainer>
          </MainContent>
        </KeyboardAwareScrollView>

        {/* 
        Absolute position prevents the double-gap issue. 
        Animating 'bottom' perfectly fixes the overlap/stuck issue.
      */}
        <Animated.View
          onLayout={event => setActionsHeight(event.nativeEvent.layout.height)}
          style={[
            animatedFooterStyle,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              zIndex: 999, // Ensure it stays on top of the scrolling content
              backgroundColor: theme.colors.background, // Match screen background so it hides content scrolling underneath
            },
          ]}
        >
          <ActionsContainer
            style={{
              paddingBottom: Math.max(insets.bottom, verticalScale(20)),
            }}
          >
            {actions}
          </ActionsContainer>
        </Animated.View>
      </Container>
    );
  },
);

CreateNewSessionTemplate.displayName = 'CreateNewSessionTemplate';
