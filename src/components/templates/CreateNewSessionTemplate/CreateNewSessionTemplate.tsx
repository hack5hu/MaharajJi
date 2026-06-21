import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/atoms/Typography';
import { 
  Container, HeaderWrapper, MainContent, 
  TitleContainer, FormContainer, 
  ActionsContainer 
} from './CreateNewSessionTemplate.styles';
import { Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ArrowLeft } from 'lucide-react-native';
import { Box } from '@/components/atoms/Box';
import { useLocale } from '@/hooks/useLocale';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';

export interface CreateNewSessionTemplateProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onCancelPress: () => void;
}

export const CreateNewSessionTemplate = React.memo(({
  title,
  subtitle,
  children,
  actions,
  onCancelPress
}: CreateNewSessionTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  return (
    <Container>
      <HeaderWrapper paddingTop={insets.top}>
        <Box style={{ paddingHorizontal: scale(20), paddingTop: verticalScale(12), paddingBottom: verticalScale(4), backgroundColor: theme.colors.surface as string }}>
          <Pressable 
            onPress={onCancelPress}
            style={{ flexDirection: 'row', alignItems: 'center', gap: scale(6) }}
          >
            <ArrowLeft color={theme.colors.primary as string} size={scale(18)} />
            <Typography variant="label_caps" color="primary">
              {t('common.back', { defaultValue: 'GO BACK' })}
            </Typography>
          </Pressable>
        </Box>
      </HeaderWrapper>
      <KeyboardAwareScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={verticalScale(40)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ 
          flexGrow: 1,
        }}
      >
        <MainContent>
          <TitleContainer>
            <Typography variant="headline_lg" color="on_surface" style={{ fontWeight: '700' }}>
              {title}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ marginTop: 4 }}>
              {subtitle}
            </Typography>
          </TitleContainer>

          <FormContainer>
            {children}
          </FormContainer>
        </MainContent>
      </KeyboardAwareScrollView>
      <ActionsContainer style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
        {actions}
      </ActionsContainer>
    </Container>
  );
});

CreateNewSessionTemplate.displayName = 'CreateNewSessionTemplate';
