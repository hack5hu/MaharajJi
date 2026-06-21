import React, { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { Typography } from '@/components/atoms/Typography';
import { getNext7Days } from '@/utils/dateHelpers';
import { verticalScale } from '@/styles/scaling';
import { GridContainer, DayButton } from './DaySelector.styles';

export interface DaySelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const DaySelector = React.memo(({ selectedDate, onSelectDate }: DaySelectorProps) => {
  const days = useMemo(() => getNext7Days(), []);

  return (
    <GridContainer>
      {days.map((dayOption, index) => {
        const isSelected = isSameDay(dayOption.date, selectedDate);
        return (
          <DayButton 
            key={index} 
            isSelected={isSelected} 
            onPress={() => onSelectDate(dayOption.date)}
            activeOpacity={0.7}
          >
            <Typography 
              variant="label_caps" 
              color={isSelected ? 'on_primary_container' : 'outline'}
              style={{ fontSize: 10, marginBottom: verticalScale(2) }}
            >
              {dayOption.dayName}
            </Typography>
            <Typography 
              variant="body_lg" 
              color={isSelected ? 'on_primary' : 'on_surface'}
              style={{ fontWeight: '700' }}
            >
              {dayOption.dayNumber}
            </Typography>
          </DayButton>
        );
      })}
    </GridContainer>
  );
});

DaySelector.displayName = 'DaySelector';
