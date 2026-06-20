import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AdminDashboardHome: undefined;
  CreateNewSessionAdmin: undefined;
  ManageUsersAdmin: undefined;
  AddNewCustomerAdmin: undefined;
  ManageBookings: undefined;
  HomeBookingStatus: undefined;
  Login: undefined;
  OTPVerification: { phoneNumber: string; isAdmin: boolean };
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
