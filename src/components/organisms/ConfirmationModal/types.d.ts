import { ViewStyle } from 'react-native';

export interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onDismiss: () => void;
  loading?: boolean;
  style?: ViewStyle;
}
