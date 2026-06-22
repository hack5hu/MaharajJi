import React from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ArrowLeft, Info, ChevronDown } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, verticalScale } from '@/styles/scaling';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { useLocale } from '@/hooks/useLocale';
import {
  TemplateContainer,
  HeaderWrapper,
  ContentContainer,
  FormCard,
  FieldGroup,
  PhoneInputContainer,
  CountryCodeSelector,
  InfoContainer,
  ButtonContainer,
} from './AddNewCustomerTemplate.styles';
import { AddNewCustomerTemplateProps } from './types.d';

export const AddNewCustomerTemplate = React.memo(({
  fullName,
  onFullNameChange,
  phoneNumber,
  onPhoneNumberChange,
  countryCode,
  onCountryCodePress,
  onAddPress,
  onCancelPress,
  isLoading,
  isSuccess,
  nameError,
  phoneError,
}: AddNewCustomerTemplateProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  return (
    <TemplateContainer>
      <HeaderWrapper paddingTop={insets.top}>
        <Box style={{ paddingHorizontal: scale(20), paddingTop: verticalScale(16), backgroundColor: theme.colors.surface as string }}>
          <Pressable 
            onPress={onCancelPress}
            style={{ flexDirection: 'row', alignItems: 'center', gap: scale(6) }}
          >
            <ArrowLeft color={theme.colors.primary as string} size={scale(18)} />
            <Typography variant="label_caps" color="primary">
              {t('admin.add_new_customer.back_to_customers')}
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
          paddingBottom: Math.max(insets.bottom, verticalScale(20)) + verticalScale(20),
        }}
      >
        <ContentContainer>
          {/* Title */}
          <Box style={{ marginBottom: verticalScale(24), gap: verticalScale(8) }}>

            <Typography variant="headline_lg" color="primary" style={{ fontWeight: '700', marginTop: verticalScale(8) }}>
              {t('admin.add_new_customer.add_new_member')}
            </Typography>

            <Typography variant="body_lg" color="on_surface_variant" style={{ marginTop: verticalScale(4) }}>
              {t('admin.add_new_customer.subtitle')}
            </Typography>
          </Box>

          {/* Form Card */}
          <FormCard>
            {/* Full Name */}
            <FieldGroup>
              <Typography 
                variant="label_caps" 
                color={nameError ? 'error' : 'on_surface_variant'}
                style={{ fontWeight: '600' }}
              >
                {t('admin.add_new_customer.full_name_label')}
              </Typography>
              <Input
                value={fullName}
                onChangeText={onFullNameChange}
                placeholder={t('admin.add_new_customer.full_name_placeholder')}
                isError={!!nameError}
              />
              {nameError && (
                <Typography variant="body_sm" color="error" style={{ marginTop: verticalScale(2) }}>
                  {nameError}
                </Typography>
              )}
            </FieldGroup>

            {/* Phone Number */}
            <FieldGroup>
              <Typography 
                variant="label_caps" 
                color={phoneError ? 'error' : 'on_surface_variant'}
                style={{ fontWeight: '600' }}
              >
                {t('admin.add_new_customer.phone_number_label')}
              </Typography>
              <PhoneInputContainer>
                <CountryCodeSelector onPress={onCountryCodePress}>
                  <Typography variant="body_lg" color="on_surface">
                    {countryCode}
                  </Typography>
                  <ChevronDown color={theme.colors.on_surface_variant as string} size={scale(16)} />
                </CountryCodeSelector>
                <Box style={{ flex: 1 }}>
                  <Input
                    value={phoneNumber}
                    onChangeText={onPhoneNumberChange}
                    placeholder={t('admin.add_new_customer.phone_number_placeholder')}
                    keyboardType="phone-pad"
                    isError={!!phoneError}
                    maxLength={10}
                  />
                </Box>
              </PhoneInputContainer>
              {phoneError && (
                <Typography variant="body_sm" color="error" style={{ marginTop: verticalScale(2) }}>
                  {phoneError}
                </Typography>
              )}
            </FieldGroup>

            {/* Info Message */}
            {/* <InfoContainer>
              <Info 
                color={theme.colors.tertiary as string} 
                size={scale(20)} 
                fill={theme.colors.surface_container_low as string}
              />
              <Typography variant="body_sm" color="on_tertiary_fixed_variant" style={{ flex: 1 }}>
                {t('admin.add_new_customer.info_text')}
              </Typography>
            </InfoContainer> */}

            {/* Action Buttons */}
            <ButtonContainer>
              {isSuccess ? (
                <Button
                  label={t('admin.add_new_customer.success_message')}
                  onPress={() => {}}
                  variant="primary"
                  fullWidth
                  disabled
                  style={{ backgroundColor: '#16a34a' }} // green success feedback color
                />
              ) : (
                <Button
                  label={isLoading ? t('admin.add_new_customer.adding') : t('admin.add_new_customer.add_customer_button')}
                  onPress={onAddPress}
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}

              <Button
                label={t('admin.add_new_customer.cancel_button')}
                onPress={onCancelPress}
                variant="outline"
                fullWidth
                disabled={isLoading || isSuccess}
              />
            </ButtonContainer>
          </FormCard>
        </ContentContainer>
      </KeyboardAwareScrollView>
    </TemplateContainer>
  );
});

AddNewCustomerTemplate.displayName = 'AddNewCustomerTemplate';
