export interface SessionData {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'past';
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

export type SessionFilter = 'all' | 'active' | 'draft' | 'past';
