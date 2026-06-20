import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';

export const useLogin = () => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onPhoneChange = useCallback((text: string) => {
    // Only allow numeric input
    const cleanText = text.replace(/[^0-9]/g, '');
    setPhone(cleanText);
    if (cleanText.length > 0) {
      setError(undefined);
    }
  }, []);

  const onLoginPress = useCallback(() => {
    const phoneRegex = /^\d{10}$/; // Any 10 digits to allow test numbers like 1212121212
    if (!phoneRegex.test(phone)) {
      setError(t('user.login.error_phone'));
      return;
    }

    setError(undefined);
    setIsLoading(true);

    // Simulate OTP API request matching the mockup
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = phone === '1212121212';
      // Navigate to OTP Verification screen and pass phone details + flow
      navigation.navigate('OTPVerification', { phoneNumber: '+91 ' + phone, isAdmin });
    }, 1200);
  }, [phone, navigation, t]);

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
