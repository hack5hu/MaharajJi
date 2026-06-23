export interface SessionData {
  id: string;
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
  originalData?: any;
}

export type SessionFilter = 'all' | 'active' | 'archive';
