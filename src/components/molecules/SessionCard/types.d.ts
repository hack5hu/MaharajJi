export interface SessionCardProps {
  title: string;
  status: 'active' | 'archive';
  sessionDate: string;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
  publishedBy: {
    name: string;
    avatarUrl?: string;
  };
  onEditPress?: () => void;
  onDeletePress?: () => void;
  onViewPress?: () => void;
  onPress?: () => void;
}
