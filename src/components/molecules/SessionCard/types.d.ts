export interface SessionCardProps {
  title: string;
  status: 'active' | 'draft' | 'past';
  date: string;
  time: string;
  publishedBy: {
    name: string;
    avatarUrl?: string;
  };
  onEditPress?: () => void;
  onDeletePress?: () => void;
  onViewPress?: () => void;
}
