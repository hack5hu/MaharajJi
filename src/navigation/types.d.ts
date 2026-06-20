import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AdminDashboardHome: undefined;
  CreateNewSessionAdmin: undefined;
  ManageUsersAdmin: undefined;
  AddNewCustomerAdmin: undefined;
  ManageBookings: undefined;
  HomeBookingStatus: undefined;
  MyBookings: undefined;
  History: undefined;
  BookSession: { sessionTitle: string; date: string; time: string; imageUrl: string; slotsLeft: number };
  BookingSuccessful: {
    bookingId: string;
    tokenNo: string;
    date: string;
    time: string;
    attendees: number;
    hall: string;
    imageUrl: string;
  };
  Profile: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string; isAdmin: boolean };
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
