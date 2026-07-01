import React from 'react';
import { Lock } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { TextInput, Keyboard } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useLocale } from '@/hooks/useLocale';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  TemplateContainer,
  HeroSection,
  LogoCircle,
  LogoInner,
  LogoEmoji,
  BrandName,
  BrandTagline,
  FormCard,
  FormTitle,
  FormSubtitle,
  FieldGroup,
  PhoneInputWrapper,
  CountryCode,
  InfoSection,
  LockIconWrapper,
  HelpButton,
  TruecallerRow,
  TruecallerLabel,
  DividerRow,
  DividerLine,
  InputTapOverlay,
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
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [shouldInterceptInput, isLoading]);

  return (
    <TemplateContainer>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
        bottomOffset={verticalScale(180)}>

        {/* ── Hero brand section ──────────────────────── */}
        <HeroSection>
          <LogoCircle>
            <LogoInner>
              <LogoEmoji>🙏</LogoEmoji>
            </LogoInner>
          </LogoCircle>
          <BrandName>{t('user.login.welcome_back')}</BrandName>
          <BrandTagline>{t('user.login.phone_subtitle')}</BrandTagline>
        </HeroSection>

        {/* ── Form card ───────────────────────────────── */}
        <FormCard>
          <FormTitle>{t('user.login.sign_in_title')}</FormTitle>
          <FormSubtitle>
            {t('user.login.form_subtitle')}
          </FormSubtitle>

          {/* Phone input */}
          <FieldGroup>
            <PhoneInputWrapper
              isError={!!error}
              disabled={isLoading || shouldInterceptInput}>
              {shouldInterceptInput && handleInputFocus && (
                <InputTapOverlay onPress={handleInputFocus} />
              )}
              <CountryCode>
                <Typography
                  variant="body_lg"
                  color="on_surface"
                  style={{ fontWeight: '600' }}>
                  +91
                </Typography>
              </CountryCode>
              <TextInput
                ref={inputRef}
                value={phone}
                onChangeText={onPhoneChange}
                placeholder={t('user.login.phone_placeholder', {
                  defaultValue: '1234567890',
                })}
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

            {error && (
              <Typography variant="body_sm" color="error">
                {error}
              </Typography>
            )}
          </FieldGroup>

          {/* Continue button */}
          <Button
            label={
              isLoading
                ? t('user.login.sending_otp')
                : `${t('user.login.login_button')} →`
            }
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

          {/* Truecaller option */}
          {handleTruecallerLogin && isTruecallerSupported && (
            <>
              <DividerRow>
                <DividerLine />
                <Typography variant="body_sm" color="outline">
                  {t('user.login.truecaller_prefix', {
                    defaultValue: 'Or, Login with',
                  })}
                </Typography>
                <DividerLine />
              </DividerRow>
              <TruecallerRow onPress={handleTruecallerLogin}>
                <TruecallerLabel>Truecaller →</TruecallerLabel>
              </TruecallerRow>
            </>
          )}

          {/* Terms info */}
          <InfoSection>
            <LockIconWrapper>
              <Lock
                color={theme.colors.primary as string}
                size={scale(14)}
              />
            </LockIconWrapper>
            <Typography
              variant="body_sm"
              color="on_surface_variant"
              style={{ flex: 1, lineHeight: verticalScale(18) }}>
              {t('user.login.restriction_info')}
            </Typography>
          </InfoSection>

          {/* Help link */}
          <HelpButton onPress={onHelpPress}>
            <Typography
              variant="body_sm"
              color="secondary"
              style={{ textDecorationLine: 'underline' }}>
              {t('user.login.need_help')}
            </Typography>
          </HelpButton>
        </FormCard>
      </KeyboardAwareScrollView>
    </TemplateContainer>
  );
});

LoginTemplate.displayName = 'LoginTemplate';
