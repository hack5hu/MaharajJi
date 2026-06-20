import { BookingStatus } from '@/constants/enums';

export interface BookingItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  status: BookingStatus;
  category: 'self_improvement' | 'spa' | 'church' | 'temple_hindu';
}

export interface ActiveBooking {
  id: string;
  title: string;
  comingUpLabel: string;
  date: string;
  time: string;
  token: string;
  location: string;
  imageUrl: string;
  qrCodeUrl: string;
  status: BookingStatus;
}
