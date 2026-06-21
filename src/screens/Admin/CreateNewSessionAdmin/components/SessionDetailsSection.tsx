import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { DaySelector } from '@/components/molecules/DaySelector';
import { CreateSessionForm } from '../useCreateNewSessionAdmin';
import {
  FormFieldContainer,
  StyledInput,
  StyledDropdownField,
  FieldLabel,
  FieldDescription,
  ErrorText,
} from '../CreateNewSessionAdmin.styles';

interface SessionDetailsSectionProps {
  control: Control<CreateSessionForm>;
  errors: FieldErrors<CreateSessionForm>;
  isLoading: boolean;
  locationOptions: { label: string; value: string }[];
  dayAfterTomorrow: Date;
}

export const SessionDetailsSection = React.memo(({
  control,
  errors,
  isLoading,
  locationOptions,
  dayAfterTomorrow,
}: SessionDetailsSectionProps) => {
  const theme = useTheme() as ThemeType;
  const { t } = useLocale();

  return (
    <>
      {/* Session Title */}
      <FormFieldContainer>
        <FieldLabel variant="label_caps" color="outline">
          {t('admin.create_session.session_title_label')} <Typography variant="label_caps" color="error">*</Typography>
        </FieldLabel>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              value={value}
              onChangeText={onChange}
              placeholder={t('admin.create_session.session_title_placeholder')}
              placeholderTextColor={theme.colors.outline_variant}
              isError={!!errors.title}
              editable={!isLoading}
            />
          )}
        />
        {errors.title && (
          <ErrorText variant="body_sm" color="error">
            {t(errors.title.message as any)}
          </ErrorText>
        )}
      </FormFieldContainer>

      {/* Date Selection */}
      <FormFieldContainer>
        <FieldLabel variant="label_caps" color="outline">
          {t('admin.create_session.event_day_label')} <Typography variant="label_caps" color="error">*</Typography>
        </FieldLabel>
        <FieldDescription variant="body_sm" color="on_surface_variant">
          {t('admin.create_session.event_day_desc')}
        </FieldDescription>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DaySelector
              selectedDate={value}
              onSelectDate={onChange}
              startDate={dayAfterTomorrow}
            />
          )}
        />
        {errors.date && (
          <ErrorText variant="body_sm" color="error">
            {t(errors.date.message as any)}
          </ErrorText>
        )}
      </FormFieldContainer>

      {/* Location */}
      <FormFieldContainer style={{ zIndex: 100, elevation: 10 }}>
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <StyledDropdownField
              label={`${t('admin.create_session.location_label')} *`}
              value={value}
              options={locationOptions}
              onSelect={onChange}
              isError={!!errors.location}
              errorMessage={errors.location ? t(errors.location.message as any) : undefined}
              placeholder={isLoading ? t('admin.create_session.location_loading') : t('admin.create_session.location_placeholder')}
            />
          )}
        />
      </FormFieldContainer>
    </>
  );
});

SessionDetailsSection.displayName = 'SessionDetailsSection';
