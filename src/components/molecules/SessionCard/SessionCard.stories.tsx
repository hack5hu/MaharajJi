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
      date="May 12, 2024"
      time="08:30 AM"
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
      date="May 13, 2024"
      time="06:00 PM"
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
      date="May 05, 2024"
      time="10:00 AM"
      publishedBy={{ name: 'Admin Anna' }}
      onViewPress={() => console.log('View')}
    />
  </View>
);
