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
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="AdminDashboardHome" component={AdminDashboardHome} />
              <Stack.Screen name="CreateNewSessionAdmin" component={CreateNewSessionAdmin} />
              <Stack.Screen name="ManageUsersAdmin" component={ManageUsersAdmin} />
              <Stack.Screen name="AddNewCustomerAdmin" component={AddNewCustomerAdmin} />
              <Stack.Screen name="ManageBookings" component={ManageBookings} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;
