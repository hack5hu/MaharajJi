export interface LoginTemplateProps {
  phone: string;
  onPhoneChange: (text: string) => void;
  onLoginPress: () => void;
  onHelpPress: () => void;
  isLoading: boolean;
  error?: string;
}
