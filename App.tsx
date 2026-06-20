/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { theme } from './src/theme/theme';
import { AdminDashboardHome } from './src/screens/Admin/AdminDashboardHome';
import { CreateNewSessionAdmin } from './src/screens/Admin/CreateNewSessionAdmin';
import { ManageUsersAdmin } from './src/screens/Admin/ManageUsersAdmin';
import { AddNewCustomerAdmin } from './src/screens/Admin/AddNewCustomerAdmin';
import { ManageBookings } from './src/screens/Admin/ManageBookings';
import { AdminSettings } from './src/screens/Admin/AdminSettings';
import { HomeBookingStatus } from './src/screens/User/HomeBookingStatus';
import { MyBookings } from './src/screens/User/MyBookings';
import { Profile } from './src/screens/User/Profile';
import { History } from './src/screens/User/History';
import { BookingSuccessful } from './src/screens/User/BookingSuccessful';
import { BookSession } from './src/screens/User/BookSession';
import { Login } from './src/screens/Auth/Login';
import { OTPVerification } from './src/screens/Auth/OTPVerification';
import { ApiDebugger } from './src/components/organisms/ApiDebugger';
import type { RootStackParamList } from './src/navigation/types';
import { storage, StorageKeys } from './src/utils/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // Synchronously check for login status
  const hasToken = storage.getString(StorageKeys.AUTH_TOKEN);
  const userRole = storage.getString(StorageKeys.USER_ROLE);
  
  let initialRoute: keyof RootStackParamList = 'Login';
  
  if (hasToken) {
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      initialRoute = 'AdminDashboardHome';
    } else {
      initialRoute = 'HomeBookingStatus';
    }
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="OTPVerification" component={OTPVerification} />
              <Stack.Screen name="AdminDashboardHome" component={AdminDashboardHome} />
              <Stack.Screen name="CreateNewSessionAdmin" component={CreateNewSessionAdmin} />
              <Stack.Screen name="ManageUsersAdmin" component={ManageUsersAdmin} />
              <Stack.Screen name="AddNewCustomerAdmin" component={AddNewCustomerAdmin} />
              <Stack.Screen name="ManageBookings" component={ManageBookings} />
              <Stack.Screen name="AdminSettings" component={AdminSettings} />
              <Stack.Screen name="HomeBookingStatus" component={HomeBookingStatus} />
              <Stack.Screen name="MyBookings" component={MyBookings} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="History" component={History} />
              <Stack.Screen name="BookingSuccessful" component={BookingSuccessful} />
              <Stack.Screen name="BookSession" component={BookSession} />
            </Stack.Navigator>
            <ApiDebugger />
          </NavigationContainer>
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;
