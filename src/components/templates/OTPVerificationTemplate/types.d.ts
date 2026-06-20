import type { RefObject } from 'react';
import type { OtpInputRef } from 'react-native-otp-entry';

export interface OTPVerificationTemplateProps {
  phone: string;
  otp: string;
  otpRef: RefObject<OtpInputRef>;
  onOtpChange: (text: string) => void;
  onVerifyPress: () => void;
  onResendPress: () => void;
  resendTimer: number;
  isLoading: boolean;
  error?: string;
}
