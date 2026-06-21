export interface UserSession {
  id: string;
  title: string;
  imageUrl?: string;
  sessionDate: string;
  bookingOpenDate: string;
  bookingOpenTime?: string;
  bookingCloseTime?: string;
  slotsLeft: number;
  totalSlots: number;
}

export interface UserSessionCardProps {
  session: UserSession;
  type: 'live' | 'upcoming';
  onReservePress?: (session: UserSession) => void;
}
