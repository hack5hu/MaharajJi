import { NotificationType } from '@/constants/enums';

export interface NotificationProps {
  type?: NotificationType;
  text1?: string;
  text2?: string;
  onHide?: () => void;
}
