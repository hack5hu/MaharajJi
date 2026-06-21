import { useState, useCallback, useEffect, useRef } from 'react';
import type { OtpInputRef } from 'react-native-otp-entry';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { storage, StorageKeys } from '@/utils/storage';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';
import { OTPWidget } from '@msg91comm/sendotp-react-native';
import { Logger } from '@/utils/logger';

export const useOTPVerification = (isAdmin?: boolean, phoneNumber?: string, reqId?: string) => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const otpRef = useRef<OtpInputRef>(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [resendTimer, setResendTimer] = useState(90);

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

    try {
      // 1. Verify with MSG91 SDK
      Logger.log('MSG91 verifyOTP Request', { reqId, otp: currentOtp });
      const verifyResp = await OTPWidget.verifyOTP({ reqId, otp: currentOtp });
      Logger.log('MSG91 verifyOTP Response', verifyResp);

      // 2. Obtain token from backend
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
    } catch (e: any) {
      Logger.error('MSG91 verifyOTP Error', e);
      setError(e?.message || t('user.otp_verification.error_otp'));
    }
  }, [otp, phoneNumber, execute, navigation, t, reqId]);

  const onResendPress = useCallback(async () => {
    try {
      Logger.log('MSG91 retryOTP Request', { reqId, channel: 1 });
      const retryResp = await OTPWidget.retryOTP({ reqId, channel: 1 }); // channel 1 = SMS
      Logger.log('MSG91 retryOTP Response', retryResp);
      
      setResendTimer(90);
      setOtp('');
      setError(undefined);
      // Clear the OTP input boxes via ref
      otpRef.current?.clear();
    } catch (e: any) {
      Logger.error('MSG91 retryOTP Error', e);
      setError(e?.message || t('user.errors.server_error'));
    }
  }, [reqId, t]);

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
