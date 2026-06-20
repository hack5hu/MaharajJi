import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export type BookingSuccessfulScreenRouteProp = RouteProp<RootStackParamList, 'BookingSuccessful'>;

export interface BookingDetails {
  bookingId: string;
  tokenNo: string;
  date: string;
  time: string;
  attendees: string;
  hall: string;
  imageUrl: string;
}
