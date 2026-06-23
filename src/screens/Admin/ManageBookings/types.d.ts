export interface SessionData {
  id: string;
  title: string;
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
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

export type SessionFilter = 'active' | 'archive';
