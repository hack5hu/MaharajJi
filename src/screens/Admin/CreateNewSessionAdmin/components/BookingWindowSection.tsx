import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { DaySelector } from '@/components/molecules/DaySelector';
import { TimePickerField } from '@/components/atoms/TimePickerField';
import {
  FormRow,
  FormFieldContainer,
  FieldLabel,
  FieldDescription,
  ErrorText,
} from '../CreateNewSessionAdmin.styles';

import { CreateSessionForm } from '../useCreateNewSessionAdmin';

interface BookingWindowSectionProps {
  control: Control<CreateSessionForm>;
  errors: FieldErrors<CreateSessionForm>;
  tomorrow: Date;
  watchedDate: any;
}

export const BookingWindowSection = React.memo(({
  control,
  errors,
  tomorrow,
  watchedDate,
}: BookingWindowSectionProps) => {
  const { t } = useLocale();

  return (
    <>
      {/* Booking Live Slot */}
      <FormFieldContainer>
        <FieldLabel variant="label_caps" color="outline">
          {t('admin.create_session.booking_open_label')} <Typography variant="label_caps" color="error">*</Typography>
        </FieldLabel>
        <FieldDescription variant="body_sm" color="on_surface_variant">
          {t('admin.create_session.booking_open_desc')}
        </FieldDescription>
        <Controller
          control={control}
          name="bookingOpenDate"
          render={({ field: { onChange, value } }) => (
            <DaySelector
              selectedDate={value}
              onSelectDate={onChange}
              startDate={tomorrow}
              maxDate={watchedDate}
            />
          )}
        />
        {errors.bookingOpenDate && (
          <ErrorText variant="body_sm" color="error">
            {t(errors.bookingOpenDate.message as any)}
          </ErrorText>
        )}
      </FormFieldContainer>

      {/* Booking Live Time */}
      <FormRow>
        <FormFieldContainer flex={1}>
          <Controller
            control={control}
            name="bookingOpenTime"
            render={({ field: { onChange, value } }) => (
              <TimePickerField
                label={`${t('admin.create_session.booking_start_time')} *`}
                value={value}
                onConfirm={onChange}
                isError={!!errors.bookingOpenTime}
                errorMessage={errors.bookingOpenTime ? t(errors.bookingOpenTime.message as any) : undefined}
              />
            )}
          />
        </FormFieldContainer>
        <FormFieldContainer flex={1}>
          <Controller
            control={control}
            name="bookingCloseTime"
            render={({ field: { onChange, value } }) => (
              <TimePickerField
                label={`${t('admin.create_session.booking_end_time')} *`}
                value={value}
                onConfirm={onChange}
                isError={!!errors.bookingCloseTime}
                errorMessage={errors.bookingCloseTime ? t(errors.bookingCloseTime.message as any) : undefined}
              />
            )}
          />
        </FormFieldContainer>
      </FormRow>
    </>
  );
});

BookingWindowSection.displayName = 'BookingWindowSection';
