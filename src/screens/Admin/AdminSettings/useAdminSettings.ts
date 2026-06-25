import { useState, useEffect, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { storage, StorageKeys } from '@/utils/storage';
import { AdminProfile } from './types.d';

export const useAdminSettings = () => {
  const navigation = useAppNavigation();
  const [profile, setProfile] = useState<AdminProfile>({
    name: 'Admin User',
    role: 'ADMIN',
  });

  useEffect(() => {
    try {
      const storedProfileStr = storage.getString(StorageKeys.USER_PROFILE);
      const storedRole = storage.getString(StorageKeys.USER_ROLE);
      
      let name = 'Admin User';
      let phone = '';
      if (storedProfileStr) {
        const parsed = JSON.parse(storedProfileStr);
        if (parsed && parsed.name) {
          name = parsed.name;
        }
        if (parsed && parsed.phone) {
          phone = parsed.phone;
        }
      }

      setProfile({
        name,
        role: storedRole || 'ADMIN',
        phone,
      });
    } catch (e) {
      console.log('Failed to parse stored admin profile', e);
    }
  }, []);

  const handleLogout = useCallback(() => {
    storage.remove(StorageKeys.AUTH_TOKEN);
    storage.remove(StorageKeys.REFRESH_TOKEN);
    storage.remove(StorageKeys.USER_ROLE);
    storage.remove(StorageKeys.USER_ID);
    storage.remove(StorageKeys.USER_PROFILE);
    
    // Reset navigation stack to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  const handleTabChange = useCallback((tab: 'dashboard' | 'bookings' | 'customers' | 'settings') => {
    if (tab === 'dashboard') {
      navigation.navigate('AdminDashboardHome');
    } else if (tab === 'bookings') {
      navigation.navigate('ManageBookings');
    } else if (tab === 'customers') {
      navigation.navigate('ManageUsersAdmin');
    }
  }, [navigation]);

  const handleMenuPress = useCallback(() => {
    console.log('Notifications bell clicked');
  }, []);

  return {
    profile,
    handleLogout,
    handleTabChange,
    handleMenuPress,
  };
};
