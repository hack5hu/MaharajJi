export type BookingStateMode = 'available' | 'empty';

export interface ActiveSessionBooking {
  title: string;
  comingUpLabel: string;
  date: string;
  time: string;
  slotsLeft: number;
  totalSlots: number;
  imageUrl: string;
}
