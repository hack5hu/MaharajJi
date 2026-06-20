export interface OTPVerificationTemplateProps {
  phone: string;
  otp: string;
  onOtpChange: (text: string) => void;
  onVerifyPress: () => void;
  onResendPress: () => void;
  resendTimer: number;
  isLoading: boolean;
  error?: string;
}
