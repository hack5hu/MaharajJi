import type { RefObject } from 'react';
import type { OtpInputRef } from 'react-native-otp-entry';

export interface OTPVerificationTemplateProps {
  phone: string;
  otp: string;
  otpRef: RefObject<OtpInputRef | null>;
  onOtpChange: (text: string) => void;
  onVerifyPress: (filledOtp?: string) => void | Promise<void>;
  onResendPress: () => void;
  resendTimer: number;
  isLoading: boolean;
  error?: string;
}
