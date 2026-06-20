import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';

export const useLogin = () => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const { execute, isLoading } = useApi(AuthService.login);

  const onPhoneChange = useCallback((text: string) => {
    // Only allow numeric input
    const cleanText = text.replace(/[^0-9]/g, '');
    setPhone(cleanText);
    if (cleanText.length > 0) {
      setError(undefined);
    }
  }, []);

  const onLoginPress = useCallback(async () => {
    const phoneRegex = /^\d{10}$/; // Any 10 digits to allow test numbers like 1212121212
    if (!phoneRegex.test(phone)) {
      setError(t('user.login.error_phone'));
      return;
    }

    setError(undefined);

    const result = await execute({ phoneNumber: phone });
    if (result.success) {
      const isAdmin = phone === '1212121212';
      // Navigate to OTP Verification screen and pass phone details + flow
      navigation.navigate('OTPVerification', { phoneNumber: '+91 ' + phone, isAdmin });
    } else if (result.error) {
      setError(result.error.message || t('user.errors.server_error'));
    }
  }, [phone, navigation, t, execute]);

  const onHelpPress = useCallback(() => {
    console.log('Need help clicked');
  }, []);

  return {
    phone,
    onPhoneChange,
    onLoginPress,
    onHelpPress,
    isLoading,
    error,
  };
};
