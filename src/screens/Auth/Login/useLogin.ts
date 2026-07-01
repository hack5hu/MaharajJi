import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';
import { useTruecallerLogin } from './useTruecallerLogin';
import { Logger } from '@/utils/logger';

export const useLogin = () => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isTruecallerLoading, setIsTruecallerLoading] = useState(false);

  const { execute, isLoading: isApiLoading } = useApi(AuthService.login);
  
  const {
    isTruecallerSupported,
    hasDismissedTruecaller,
    handleTruecallerLogin,
    handleInputFocus,
  } = useTruecallerLogin({
    setLoading: setIsTruecallerLoading,
    setError,
  });

  const isLoading = isApiLoading || isTruecallerLoading;
  const shouldInterceptInput = isTruecallerSupported && !hasDismissedTruecaller && !error;

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

    try {
      // Call backend API for login (to ensure backend state is ready/record user and send OTP)
      const beResult = await execute({ phoneNumber: phone });
      
      if (!beResult.success) {
        Logger.error('Backend login error', beResult.error);
        setError(typeof beResult.error === 'string' ? beResult.error : t('user.errors.server_error'));
        return;
      }

      const isAdmin = phone === '1212121212';
      navigation.navigate('OTPVerification', { 
        phoneNumber: '+91 ' + phone, 
        isAdmin, 
      });
    } catch (e: any) {
      Logger.error('Login Error', e);
      setError(e?.message || t('user.errors.server_error'));
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
    handleTruecallerLogin,
    handleInputFocus,
    isTruecallerSupported,
    shouldInterceptInput,
  };
};
