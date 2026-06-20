import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Keyboard } from 'react-native';
import { format } from 'date-fns';
import { Typography } from '@/components/atoms/Typography';
import { PickerButton, FieldWrapper } from './TimePickerField.styles';

export interface TimePickerFieldProps {
  label: string;
  value: Date;
  onConfirm: (date: Date) => void;
  isError?: boolean;
  errorMessage?: string;
  minimumDate?: Date;
}

export const TimePickerField = React.memo(({ label, value, onConfirm, isError, errorMessage, minimumDate }: TimePickerFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FieldWrapper>
      <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
        {label}
      </Typography>
      
      <PickerButton 
        isError={isError} 
        onPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
        activeOpacity={0.7}
      >
        <Typography variant="body_lg" color="on_surface">
          {format(value, 'HH:mm')}
        </Typography>
      </PickerButton>

      {isError && errorMessage && (
        <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
          {errorMessage}
        </Typography>
      )}

      <DatePicker
        modal
        open={open}
        date={value}
        mode="time"
        minimumDate={minimumDate}
        onConfirm={(date) => {
          setOpen(false);
          onConfirm(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </FieldWrapper>
  );
});

TimePickerField.displayName = 'TimePickerField';
