import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'maharajji-app-storage',
});

export const StorageKeys = {
  USER_PROFILE: 'user_profile',
} as const;
