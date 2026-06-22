import React from 'react';
import { Lock } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale, responsiveFont } from '@/styles/scaling';
import { TextInput } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { useLocale } from '@/hooks/useLocale';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  TemplateContainer,
  BackgroundDecorations,
  InnerWrapper,
  BrandSection,
  LogoCircle,
  FormCard,
  FieldGroup,
  PhoneInputWrapper,
  CountryCode,
  InfoSection,
  HelpButton,
  TruecallerRow,
  InputTapOverlay,
  DecorationCircle,
} from './LoginTemplate.styles';
import { LoginTemplateProps } from './types.d';

export const LoginTemplate = React.memo(({
  phone,
  onPhoneChange,
  onLoginPress,
  onHelpPress,
  isLoading,
  error,
  handleTruecallerLogin,
  handleInputFocus,
  isTruecallerSupported,
  shouldInterceptInput,
}: LoginTemplateProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (!shouldInterceptInput && !isLoading) {
      // Small delay to ensure keyboard controller is ready and UI has updated
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [shouldInterceptInput, isLoading]);

  return (
    <TemplateContainer>
      <BackgroundDecorations>
        <DecorationCircle size={200} posTop={-50} posLeft={-50} />
        <DecorationCircle size={250} posBottom={-50} posRight={-50} />
      </BackgroundDecorations>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: verticalScale(40) }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={verticalScale(220)}>
        <InnerWrapper>
          {/* Login Card */}
          <FormCard>
            {/* Brand Identity */}
            <BrandSection>
              <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(8) }}>
                <LogoCircle>
                  <Typography variant="headline_md" color="on_primary" style={{ fontSize: responsiveFont(20) }}>
                    🙏
                  </Typography>
                </LogoCircle>
                <Typography variant="headline_lg" color="on_surface" style={{ fontWeight: '800' }}>
                  {t('user.login.welcome_back')}
                </Typography>
              </Box>
              <Typography variant="body_lg" color="on_surface_variant" style={{ fontWeight: '500' }}>
                {t('user.login.phone_subtitle')}
              </Typography>
            </BrandSection>

            {/* Input Phone */}
            <FieldGroup>
              <Typography variant="label_caps" color={error ? 'error' : 'outline'} style={{ fontWeight: '600', letterSpacing: 1.5 }}>
                {t('user.login.phone_label')}
              </Typography>
              <PhoneInputWrapper isError={!!error} disabled={isLoading || shouldInterceptInput}>
                {shouldInterceptInput && handleInputFocus && (
                  <InputTapOverlay onPress={handleInputFocus} />
                )}
                <CountryCode>
                  <Typography variant="body_lg" color="outline" style={{ fontWeight: '600' }}>
                    +91
                  </Typography>
                </CountryCode>
                <TextInput
                  ref={inputRef}
                  value={phone}
                  onChangeText={onPhoneChange}
                  placeholder={t('user.login.phone_placeholder', { defaultValue: '1234567890' })}
                  placeholderTextColor={theme.colors.outline}
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={{
                    flex: 1,
                    color: theme.colors.on_surface,
                    fontSize: scale(16),
                    fontFamily: 'Inter',
                  }}
                  editable={!isLoading && !shouldInterceptInput}
                  showSoftInputOnFocus={!shouldInterceptInput}
                />
              </PhoneInputWrapper>
              {handleTruecallerLogin && isTruecallerSupported && (
                <TruecallerRow onPress={handleTruecallerLogin}>
                  <Typography variant="body_lg" color="on_surface_variant">
                    {t('user.login.truecaller_prefix', { defaultValue: 'Or, Login with' })}
                  </Typography>
                  <Box style={{ flexDirection: 'row', alignItems: 'center', gap: scale(4) }}>
                    <Typography variant="body_lg" color="primary" style={{ fontWeight: '700' }}>
                      truecaller &gt;
                    </Typography>
                  </Box>
                </TruecallerRow>
              )}
              {error && (
                <Typography variant="body_sm" color="error">
                  {error}
                </Typography>
              )}
            </FieldGroup>

            {/* Restriction Info */}
            <InfoSection>
              <Box style={{ padding: scale(8), backgroundColor: theme.colors.surface_container_low, borderRadius: 999 }}>
                <Lock color={theme.colors.primary as string} size={scale(16)} />
              </Box>
              <Typography variant="body_sm" color="on_surface_variant" style={{ flex: 1, lineHeight: verticalScale(18) }}>
                {t('user.login.restriction_info')}
              </Typography>
            </InfoSection>

            {/* Button */}
            <Button
              label={isLoading ? t('user.login.sending_otp') : `${t('user.login.login_button')} →`}
              onPress={onLoginPress}
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              style={{
                borderRadius: theme.rounded.lg,
                paddingVertical: verticalScale(14),
              }}
            />

            <HelpButton onPress={onHelpPress}>
              <Typography variant="body_sm" color="secondary" style={{ textDecorationLine: 'underline' }}>
                {t('user.login.need_help')}
              </Typography>
            </HelpButton>
          </FormCard>
        </InnerWrapper>
      </KeyboardAwareScrollView>
    </TemplateContainer>
  );
});

LoginTemplate.displayName = 'LoginTemplate';
