import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/hooks/useLocale';
import { scale, verticalScale } from '@/styles/scaling';
import {
  TemplateContainer,
  HeaderWrapper,
  BackPressable,
  HeaderContainer,
  ContentContainer,
  StyledScrollView,
  FooterContainer,
} from './BookSessionTemplate.styles';
import { BookSessionTemplateProps } from './types.d';

export const BookSessionTemplate = React.memo(({
  onBackPress,
  children,
  footer,
}: BookSessionTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const [footerHeight, setFooterHeight] = useState(0);

  const paddingBottom = footer
    ? footerHeight + verticalScale(16)
    : Math.max(insets.bottom, verticalScale(20)) + verticalScale(20);

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

      <StyledScrollView paddingBottom={paddingBottom} keyboardShouldPersistTaps="handled">
        <ContentContainer>
          {children}
        </ContentContainer>
      </StyledScrollView>

      {footer ? (
        <FooterContainer
          insetsBottom={insets.bottom}
          onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
        >
          {footer}
        </FooterContainer>
      ) : null}
    </TemplateContainer>
  );
});

BookSessionTemplate.displayName = 'BookSessionTemplate';
