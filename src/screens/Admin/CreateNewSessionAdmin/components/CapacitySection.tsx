import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { CreateSessionForm } from '../useCreateNewSessionAdmin';
import {
  FormRow,
  FormFieldContainer,
  StyledInput,
  FieldLabel,
  ErrorText,
} from '../CreateNewSessionAdmin.styles';

interface CapacitySectionProps {
  control: Control<CreateSessionForm>;
  errors: FieldErrors<CreateSessionForm>;
  isLoading: boolean;
}

export const CapacitySection = React.memo(({
  control,
  errors,
  isLoading,
}: CapacitySectionProps) => {
  const { t } = useLocale();

  return (
    <FormRow>
      <FormFieldContainer flex={1}>
        <FieldLabel variant="label_caps" color="outline">
          {t('admin.create_session.seats_label')} <Typography variant="label_caps" color="error">*</Typography>
        </FieldLabel>
        <Controller
          control={control}
          name="tokens"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              value={String(value)}
              onChangeText={text => onChange(Number(text))}
              keyboardType="numeric"
              isError={!!errors.tokens}
              editable={!isLoading}
            />
          )}
        />
        {errors.tokens && (
          <ErrorText variant="body_sm" color="error">
            {t(errors.tokens.message as any)}
          </ErrorText>
        )}
      </FormFieldContainer>

      <FormFieldContainer flex={1}>
        <FieldLabel variant="label_caps" color="outline">
          {t('admin.create_session.max_user_label')} <Typography variant="label_caps" color="error">*</Typography>
        </FieldLabel>
        <Controller
          control={control}
          name="maxPeoplePerToken"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              value={String(value)}
              onChangeText={text => onChange(Number(text))}
              keyboardType="numeric"
              isError={!!errors.maxPeoplePerToken}
              editable={!isLoading}
            />
          )}
        />
        {errors.maxPeoplePerToken && (
          <ErrorText variant="body_sm" color="error">
            {t(errors.maxPeoplePerToken.message as any)}
          </ErrorText>
        )}
      </FormFieldContainer>
    </FormRow>
  );
});

CapacitySection.displayName = 'CapacitySection';
