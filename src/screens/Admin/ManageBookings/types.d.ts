export interface SessionData {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'past';
  date: string;
  time: string;
  publishedBy: {
    name: string;
    avatarUrl?: string;
  };
}

export type SessionFilter = 'all' | 'active' | 'draft' | 'past';
