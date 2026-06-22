import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '@/styles/scaling';
import { TemplateContainer, ContentContainer } from './BookingSuccessfulTemplate.styles';
import { BookingSuccessfulTemplateProps } from './types.d';

export const BookingSuccessfulTemplate = React.memo(({ children }: BookingSuccessfulTemplateProps) => {
  const insets = useSafeAreaInsets();

  return (
    <TemplateContainer>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(insets.top, verticalScale(20)),
          paddingBottom: Math.max(insets.bottom, verticalScale(20)) + verticalScale(20),
        }}
       keyboardShouldPersistTaps="handled">
        <ContentContainer>
          {children}
        </ContentContainer>
      </ScrollView>
    </TemplateContainer>
  );
});

BookingSuccessfulTemplate.displayName = 'BookingSuccessfulTemplate';
