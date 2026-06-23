export interface AttendeeCardProps {
  customerName: string;
  customerPhone: string;
  status: string;
  numberOfPeople: number;
  tokenNumber: number;
  bookingId: string;
  onPress?: () => void;
}
