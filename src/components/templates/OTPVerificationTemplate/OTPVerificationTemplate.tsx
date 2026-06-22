import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale, responsiveFont } from '@/styles/scaling';
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
  TimerRow,
  ResendPressable,
  DecorationCircle,
} from './OTPVerificationTemplate.styles';
import { OTPVerificationTemplateProps } from './types.d';

export const OTPVerificationTemplate = React.memo(({
  phone,
  otpRef,
  onOtpChange,
  onVerifyPress,
  onResendPress,
  resendTimer,
  isLoading,
  error,
}: OTPVerificationTemplateProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  return (
    <TemplateContainer>
      <BackgroundDecorations>
        <DecorationCircle size={200} posTop={-50} posLeft={-50} />
        <DecorationCircle size={250} posBottom={-50} posRight={-50} />
      </BackgroundDecorations>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(40) }}
        bottomOffset={verticalScale(180)}
        keyboardShouldPersistTaps="handled">
        <InnerWrapper>
          {/* Brand Identity */}
          <BrandSection>
            <LogoCircle>
              <Typography variant="headline_md" color="on_primary" style={{ fontSize: responsiveFont(28) }}>
                🙏
              </Typography>
            </LogoCircle>
            <Box style={{ alignItems: 'center' }}>
              <Typography variant="headline_lg_mobile" color="primary" style={{ fontWeight: '800' }}>
                {t('user.otp_verification.brand_title')}
              </Typography>
              <Typography variant="body_lg" color="on_surface_variant">
                {t('user.otp_verification.brand_subtitle')}
              </Typography>
            </Box>
          </BrandSection>

          {/* Form Card */}
          <FormCard>
            <Box style={{ gap: verticalScale(4) }}>
              <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700' }}>
                {t('user.otp_verification.title')}
              </Typography>
              <Typography variant="body_sm" color="on_surface_variant">
                {t('user.otp_verification.subtitle', { phone })}
              </Typography>
            </Box>

            {/* OTP Entry */}
            <FieldGroup>
              <Typography variant="label_caps" color={error ? 'error' : 'outline'} style={{ fontWeight: '600', letterSpacing: 1.5 }}>
                {t('user.otp_verification.code_label')}
              </Typography>

              <OtpInput
                ref={otpRef}
                numberOfDigits={6}
                autoFocus
                type="numeric"
                focusColor={theme.colors.primary as string}
                blurOnFilled={false}
                disabled={isLoading}
                onTextChange={onOtpChange}
                onFilled={onVerifyPress}
                textInputProps={{
                  style: { backgroundColor: 'transparent' },
                  caretHidden: true,
                }}
                theme={{
                  containerStyle: {
                    gap: scale(8),
                  },
                  pinCodeContainerStyle: {
                    width: scale(44),
                    height: scale(52),
                    borderRadius: scale(12),
                    backgroundColor: theme.colors.surface_container_low as string,
                    borderWidth: 0,
                    borderColor: 'transparent',
                  },
                  focusedPinCodeContainerStyle: {
                    borderColor: theme.colors.primary as string,
                  },
                  filledPinCodeContainerStyle: {
                    backgroundColor: theme.colors.surface_container as string,
                  },
                  pinCodeTextStyle: {
                    color: theme.colors.on_surface as string,
                    fontSize: scale(22),
                    fontFamily: 'PlusJakartaSans-Bold',
                    fontWeight: '700',
                  },
                  focusStickStyle: {
                    backgroundColor: theme.colors.primary as string,
                    width: 2,
                    height: scale(24),
                  },
                }}
              />

              {error && (
                <Typography variant="body_sm" color="error" style={{ textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
            </FieldGroup>

            {/* Verify Button */}
            <Button
              label={isLoading ? t('user.otp_verification.verifying') : t('user.otp_verification.verify_button')}
              onPress={onVerifyPress}
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              style={{
                borderRadius: theme.rounded.lg,
                paddingVertical: verticalScale(14),
              }}
            />

            {/* Timer and Resend Row */}
            <TimerRow>
              {resendTimer > 0 ? (
                <Typography variant="body_sm" color="on_surface_variant">
                  {t('user.otp_verification.resend_timer', { seconds: resendTimer })}
                </Typography>
              ) : (
                <ResendPressable onPress={onResendPress} disabled={isLoading}>
                  <Typography variant="body_sm" color="primary" style={{ fontWeight: '700', textDecorationLine: 'underline' }}>
                    {t('user.otp_verification.resend_text')}
                  </Typography>
                </ResendPressable>
              )}
            </TimerRow>
          </FormCard>
        </InnerWrapper>
      </KeyboardAwareScrollView>
    </TemplateContainer>
  );
});

OTPVerificationTemplate.displayName = 'OTPVerificationTemplate';
