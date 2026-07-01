import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminSession } from '@/serviceManager/types.d';

export type RootStackParamList = {
  AdminDashboardHome: undefined;
  CreateNewSessionAdmin: { session?: AdminSession } | undefined;
  ManageUsersAdmin: undefined;
  AddNewCustomerAdmin: undefined;
  ManageBookings: undefined;
  AdminSettings: undefined;
  HomeBookingStatus: undefined;
  MyBookings: undefined;
  BookSession: { sessionId: string; sessionTitle: string; date: string; time: string; imageUrl: string; slotsLeft: number; maxPeoplePerToken: number; location: string };
  BookingSuccessful: {
    tokenNumber: number;
    date: string;
    attendees: number;
    location: string;
    imageUrl: string;
  };
  Profile: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string; isAdmin: boolean };
  SessionAttendeesList: { sessionId: string; sessionTitle: string; sessionDate: string; location: string; totalTokens: number };
  History: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
