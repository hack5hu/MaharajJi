import React from 'react';
import { View } from 'react-native';
import { UserSessionCard } from './UserSessionCard';
import { UserSession } from './types.d';

export default {
  title: 'Molecules/UserSessionCard',
  component: UserSessionCard,
};

const mockSession: UserSession = {
  id: '1',
  title: 'sahil ke ghar bandhara',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Zgwf2YtZKTGT-ftE3Y8GCAzU-nxvKaWAyEqKxcIzAxcdA-qebz1eIqbuscjt-SeC5H5vKCmNnQtdFdTorLCQpEq-ygKuOFSsIPc7UYRUCeXUVvyd2DRRZLn-w5nyM9tCZqX5d4Y0ooDR6bM4jkHn4uzL6XCp_Utggmb1YR4nhKna8ckn5hukC46LjZgGZkkRmuPmqXSaRP1ri7DTcURSLXHlRlDMzz1YGGcCF2yWUSwhegWo8xgBUgprZf-yE16mzQ72aNF5B6g',
  sessionDate: '2026-08-30',
  bookingOpenDate: '2026-06-21',
  bookingOpenTime: '12:30:00',
  bookingCloseTime: '13:30:00',
  slotsLeft: 10,
  totalSlots: 25,
};

export const Live = () => (
  <View style={{ padding: 16, backgroundColor: '#f5f5f5', flex: 1 }}>
    <UserSessionCard
      session={mockSession}
      type="live"
      onReservePress={(session) => console.log('Reserve', session)}
    />
  </View>
);

export const Upcoming = () => (
  <View style={{ padding: 16, backgroundColor: '#f5f5f5', flex: 1 }}>
    <UserSessionCard
      session={mockSession}
      type="upcoming"
    />
  </View>
);
