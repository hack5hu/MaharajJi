import React from 'react';
import { View } from 'react-native';
import { AttendeeCard } from './AttendeeCard';

export default {
  title: 'Molecules/AttendeeCard',
  component: AttendeeCard,
};

export const Default = () => (
  <View style={{ padding: 16, backgroundColor: '#f5f5f5', flex: 1 }}>
    <AttendeeCard
      customerName="bansal"
      customerPhone="8080808080"
      status="CONFIRMED"
      numberOfPeople={1}
      bookingId="a6f4a254-a6e6-4618-b5f3-d909a467f0bd"
      onPress={() => console.log('Pressed')}
    />
  </View>
);

export const Waitlisted = () => (
  <View style={{ padding: 16, backgroundColor: '#f5f5f5', flex: 1 }}>
    <AttendeeCard
      customerName="sahil bansal"
      customerPhone="9999999999"
      status="WAITLISTED"
      numberOfPeople={4}
      bookingId="c621a8af-10bc-4e65-a499-3c6b9a11b7b7"
      onPress={() => console.log('Pressed')}
    />
  </View>
);
