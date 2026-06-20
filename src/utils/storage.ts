import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'maharajji-app-storage',
});

export const StorageKeys = {
  USER_PROFILE: 'user_profile',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ROLE: 'user_role',
  USER_ID: 'user_id',
} as const;
