import { CustomerBooking } from '@/serviceManager/types';

export interface SessionAttendeesListTemplateProps {
  sessionTitle: string;
  sessionDate: string;
  location: string;
  filledCount: number;
  totalTokens: number;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  attendees: CustomerBooking[];
  onBackPress: () => void;
  onAttendeePress?: (attendee: CustomerBooking) => void;
  isLoading: boolean;
  totalBookings: number;
}
