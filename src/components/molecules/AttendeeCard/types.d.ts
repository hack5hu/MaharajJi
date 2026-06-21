export interface AttendeeCardProps {
  customerName: string;
  customerPhone: string;
  status: string;
  numberOfPeople: number;
  bookingId: string;
  onPress?: () => void;
}
