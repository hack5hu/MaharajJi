export type BookingStateMode = 'available' | 'empty';

export interface SessionCardUI {
  id: string;
  title: string;
  sessionState: 'LIVE' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  sessionDate: string;
  bookingOpenDate: string;
  bookingOpenTime: string;
  bookingCloseTime: string;
  slotsLeft: number;
  totalSlots: number;
  maxPeoplePerToken: number;
  imageUrl: string;
  location: string;
}
