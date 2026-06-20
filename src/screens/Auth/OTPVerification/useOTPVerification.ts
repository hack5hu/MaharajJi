import { useState, useCallback, useEffect, useRef } from 'react';
import type { OtpInputRef } from 'react-native-otp-entry';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { storage, StorageKeys } from '@/utils/storage';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';

export const useOTPVerification = (isAdmin?: boolean, phoneNumber?: string) => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const otpRef = useRef<OtpInputRef>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [resendTimer, setResendTimer] = useState(30);

  const { execute, isLoading } = useApi(AuthService.verifyOtp);

  // Resend OTP Countdown Timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const onOtpChange = useCallback((text: string) => {
    setOtp(text);
    if (text.length > 0) {
      setError(undefined);
    }
  }, []);

  const onVerifyPress = useCallback(async (filledOtp?: string) => {
    const currentOtp = typeof filledOtp === 'string' ? filledOtp : otp;
    
    if (currentOtp.length !== 6) {
      setError(t('user.otp_verification.error_otp'));
      return;
    }

    setError(undefined);

    const cleanPhone = phoneNumber ? phoneNumber.replace('+91 ', '').trim() : '';

    const result = await execute({
      phoneNumber: cleanPhone,
      otp: currentOtp,
    });

    if (result.success && result.data) {
      const responseData = result.data;

      // Store tokens and user details
      storage.set(StorageKeys.AUTH_TOKEN, responseData.token);
      storage.set(StorageKeys.REFRESH_TOKEN, responseData.refreshToken);
      storage.set(StorageKeys.USER_ROLE, responseData.role);
      storage.set(StorageKeys.USER_ID, responseData.userId);

      // Save profile info in MMKV
      const isUserAdmin = responseData.role === 'ADMIN' || responseData.role === 'SUPER_ADMIN';
      const profile = {
        name: isUserAdmin ? 'Admin User' : 'Brother John',
        phone: cleanPhone,
      };
      storage.set(StorageKeys.USER_PROFILE, JSON.stringify(profile));

      if (isUserAdmin) {
        navigation.navigate('AdminDashboardHome');
      } else {
        navigation.navigate('HomeBookingStatus');
      }
    } else if (result.error) {
      setError(result.error.message || t('user.errors.server_error'));
    }
  }, [otp, phoneNumber, execute, navigation, t]);

  const onResendPress = useCallback(() => {
    setResendTimer(30);
    setOtp('');
    setError(undefined);
    // Clear the OTP input boxes via ref
    otpRef.current?.clear();
  }, []);

  return {
    otpRef,
    otp,
    onOtpChange,
    onVerifyPress,
    onResendPress,
    resendTimer,
    isLoading,
    error,
  };
};
