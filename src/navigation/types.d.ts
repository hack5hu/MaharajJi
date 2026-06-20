import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AdminDashboardHome: undefined;
  CreateNewSessionAdmin: undefined;
  ManageUsersAdmin: undefined;
  AddNewCustomerAdmin: undefined;
  ManageBookings: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
