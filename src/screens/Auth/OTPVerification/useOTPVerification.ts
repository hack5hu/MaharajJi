import { useState, useCallback, useEffect, useRef } from 'react';
import type { OtpInputRef } from 'react-native-otp-entry';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { storage, StorageKeys } from '@/utils/storage';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';
import { Logger } from '@/utils/logger';

export const useOTPVerification = (isAdmin?: boolean, phoneNumber?: string) => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const otpRef = useRef<OtpInputRef>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [resendTimer, setResendTimer] = useState(90);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);

  const { execute: executeVerify, isLoading: isApiLoading } = useApi(AuthService.verifyOtp);
  const { execute: executeResend } = useApi(AuthService.resendOtp);

  const isLoading = isApiLoading || isVerifyingOTP || isResendingOTP;

  // Resend OTP Countdown Timer — 1:30 min
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

    try {
      setIsVerifyingOTP(true);
      Logger.log('verifyOTP Request', { phone: cleanPhone });

      const result = await executeVerify({
        phoneNumber: cleanPhone,
        otp: currentOtp,
      });

      Logger.log('verifyOTP Response', result);

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
          name: responseData.name || (isUserAdmin ? 'Admin User' : 'Brother John'),
          phone: cleanPhone,
        };
        storage.set(StorageKeys.USER_PROFILE, JSON.stringify(profile));

        if (isUserAdmin) {
          navigation.navigate('AdminDashboardHome');
        } else {
          navigation.navigate('HomeBookingStatus');
        }
      } else if (result.error) {
        setError(typeof result.error === 'string' ? result.error : t('user.errors.server_error'));
      }
    } catch (e: any) {
      Logger.error('verifyOTP Error', e);
      setError(e?.message || t('user.otp_verification.error_otp'));
    } finally {
      setIsVerifyingOTP(false);
    }
  }, [otp, phoneNumber, executeVerify, navigation, t]);

  const onResendPress = useCallback(async () => {
    const cleanPhone = phoneNumber ? phoneNumber.replace('+91 ', '').trim() : '';

    try {
      setIsResendingOTP(true);
      Logger.log('resendOTP Request', { phone: cleanPhone });

      const result = await executeResend({ phoneNumber: cleanPhone });
      Logger.log('resendOTP Response', result);

      if (result.success) {
        setResendTimer(90);
        setOtp('');
        setError(undefined);
        otpRef.current?.clear();
      } else {
        setError(typeof result.error === 'string' ? result.error : t('user.errors.server_error'));
      }
    } catch (e: any) {
      Logger.error('resendOTP Error', e);
      setError(e?.message || t('user.errors.server_error'));
    } finally {
      setIsResendingOTP(false);
    }
  }, [phoneNumber, executeResend, t]);

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
