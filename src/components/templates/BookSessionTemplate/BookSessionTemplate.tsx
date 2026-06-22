import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/hooks/useLocale';
import { scale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  BackPressable,
  HeaderContainer,
  ContentContainer,
  StyledScrollView,
} from './BookSessionTemplate.styles';
import { BookSessionTemplateProps } from './types.d';

export const BookSessionTemplate = React.memo(({
  onBackPress,
  children,
}: BookSessionTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <HeaderContainer>
          <BackPressable onPress={onBackPress}>
            <ArrowLeft color={theme.colors.primary as string} size={scale(18)} />
            <Typography variant="label_caps" color="primary">
              {t('common.back', { defaultValue: 'Back' })}
            </Typography>
          </BackPressable>
        </HeaderContainer>
      </HeaderWrapper>

      <StyledScrollView insetsBottom={insets.bottom} keyboardShouldPersistTaps="handled">
        <ContentContainer>
          {children}
        </ContentContainer>
      </StyledScrollView>
    </TemplateContainer>
  );
});

BookSessionTemplate.displayName = 'BookSessionTemplate';
