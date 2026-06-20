export interface UserData {
  id: string;
  initials: string;
  name: string;
  phone: string;
  status: 'Premium' | 'Regular';
  lastVisit: string;
  avatarColorHex?: string;
}

export type FilterOption = 'Alphabetical' | 'Recently Added' | 'Premium Only' | 'Regular Only';
