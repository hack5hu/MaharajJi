import React from 'react';
import { View } from 'react-native';
import { SessionCard } from './SessionCard';

export default {
  title: 'Molecules/SessionCard',
  component: SessionCard,
};

export const Active = () => (
  <View style={{ padding: 16 }}>
    <SessionCard
      title="Sabbath Morning Prayer"
      status="active"
      sessionDate="May 12, 2024"
      bookingDate="May 10, 2024"
      bookingStartTime="08:30 AM"
      bookingEndTime="09:30 AM"
      publishedBy={{ 
        name: 'Admin Sarah', 
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB26kbQ_YoSWONwh7WoYNRT3PmNsDN6VJbd9kzqLbkwqmbYBicZDBwyyUB4hqFexAE-zhjlwhNdd822SNC5QqGp_vIIxDCbjtZ1_Izlnz5EiHnPcRYN5lzkAf5fVy_zjOpqlPXOMxDlcLor7T7ZlG_UM2VnAAiwTySIgRLhyTG1h4BpCRPZLiKRfVbH7IIMT_LJ8SkqOY5ilu9UxkU1vMoldRQ2Tk-asOBmDR0UiODJAho0YXkdoVrkFyoiwdfFvqJDdN56ScOgBWU' 
      }}
      onEditPress={() => console.log('Edit')}
      onDeletePress={() => console.log('Delete')}
    />
  </View>
);

export const Draft = () => (
  <View style={{ padding: 16 }}>
    <SessionCard
      title="Monday Evening Meditation"
      status="draft"
      sessionDate="May 13, 2024"
      bookingDate="May 11, 2024"
      bookingStartTime="06:00 PM"
      bookingEndTime="07:00 PM"
      publishedBy={{ name: 'Admin Marcus' }}
      onEditPress={() => console.log('Edit')}
      onDeletePress={() => console.log('Delete')}
    />
  </View>
);

export const Past = () => (
  <View style={{ padding: 16 }}>
    <SessionCard
      title="Weekly Community Reflection"
      status="past"
      sessionDate="May 05, 2024"
      bookingDate="May 03, 2024"
      bookingStartTime="10:00 AM"
      bookingEndTime="11:00 AM"
      publishedBy={{ name: 'Admin Anna' }}
      onViewPress={() => console.log('View')}
    />
  </View>
);
