import { useState, useEffect, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { storage, StorageKeys } from '@/utils/storage';
import { useApi } from '@/hooks/useApi';
import { AuthService } from '@/serviceManager/AuthService';
import { UserProfile } from './types.d';

export const useProfile = () => {
  const navigation = useAppNavigation();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Brother John',
    phone: '9090909090',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { execute: deleteAccount, isLoading: isDeleting } = useApi(AuthService.deleteAccount);

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

  const handleDeleteAccount = useCallback(async () => {
    setApiError(null);
    const result = await deleteAccount(undefined);
    if (result.success) {
      setShowDeleteModal(false);
      handleLogout();
    } else {
      setApiError(result.error?.message || 'Failed to delete account');
    }
  }, [deleteAccount, handleLogout]);

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
    handleDeleteAccount,
    showDeleteModal,
    setShowDeleteModal,
    isDeleting,
    apiError,
    setApiError,
    handleTabChange,
    handleMenuPress,
  };
};
