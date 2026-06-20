import { useState, useCallback, useEffect } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { storage, StorageKeys } from '@/utils/storage';

export const useOTPVerification = (isAdmin?: boolean, phoneNumber?: string) => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  // Resend OTP Countdown Timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const onOtpChange = useCallback((text: string) => {
    // Numeric input only
    const cleanText = text.replace(/[^0-9]/g, '');
    setOtp(cleanText);
    if (cleanText.length > 0) {
      setError(undefined);
    }
  }, []);

  const onVerifyPress = useCallback(() => {
    if (otp.length !== 6) {
      setError(t('user.otp_verification.error_otp'));
      return;
    }

    setError(undefined);
    setIsLoading(true);

    // Simulate OTP verification API request
    setTimeout(() => {
      setIsLoading(false);

      const cleanPhone = phoneNumber ? phoneNumber.replace('+91 ', '').trim() : '';
      const profile = {
        name: isAdmin ? 'Admin User' : 'Brother John',
        phone: cleanPhone,
      };

      storage.set(StorageKeys.USER_PROFILE, JSON.stringify(profile));

      if (isAdmin) {
        navigation.navigate('AdminDashboardHome');
      } else {
        navigation.navigate('HomeBookingStatus');
      }
    }, 1200);
  }, [otp, navigation, t, isAdmin, phoneNumber]);

  const onResendPress = useCallback(() => {
    setResendTimer(30);
    setOtp('');
    setError(undefined);
    console.log('Resend OTP code requested');
  }, []);

  return {
    otp,
    onOtpChange,
    onVerifyPress,
    onResendPress,
    resendTimer,
    isLoading,
    error,
  };
};
