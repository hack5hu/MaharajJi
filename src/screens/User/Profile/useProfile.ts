import { useState, useEffect, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { storage, StorageKeys } from '@/utils/storage';
import { UserProfile } from './types.d';

export const useProfile = () => {
  const navigation = useAppNavigation();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Brother John',
    phone: '9090909090',
  });

  useEffect(() => {
    try {
      const stored = storage.getString(StorageKeys.USER_PROFILE);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name && parsed.phone) {
          setProfile(parsed);
        }
      }
    } catch (e) {
      console.log('Failed to parse stored user profile', e);
    }
  }, []);

  const handleLogout = useCallback(() => {
    storage.remove(StorageKeys.USER_PROFILE);
    // Reset navigation stack to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  const handleTabChange = useCallback((tab: 'home' | 'bookings' | 'history' | 'profile') => {
    if (tab === 'home') {
      navigation.navigate('HomeBookingStatus');
    } else if (tab === 'bookings') {
      navigation.navigate('MyBookings');
    } else if (tab === 'history') {
      navigation.navigate('History');
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
