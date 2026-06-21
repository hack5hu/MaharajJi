import React from 'react';
import { Switch } from 'react-native';
import { Controller, useWatch } from 'react-hook-form';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { CreateNewSessionTemplate } from '@/components/templates/CreateNewSessionTemplate';
import { DaySelector } from '@/components/molecules/DaySelector';
import { TimePickerField } from '@/components/atoms/TimePickerField';
// Removed raw DropdownField import; using StyledDropdownField from styles
import { useCreateNewSessionAdmin } from './useCreateNewSessionAdmin';
import { FormRow, FormFieldContainer, StyledInput, ToggleContainer, StyledButtonWrapper, StyledDropdownField } from './CreateNewSessionAdmin.styles';

export const CreateNewSessionAdmin = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const { form, onSubmit, onSaveDraft, onMenuPress, isLoading, locations, navigation } = useCreateNewSessionAdmin();
  const { control, formState: { errors } } = form;

  const watchedDate = useWatch({ control, name: 'date' });
  const watchedStartTime = useWatch({ control, name: 'startTime' });

  const locationOptions = React.useMemo(() => {
    return locations.map(loc => ({ label: loc.name, value: loc.name }));
  }, [locations]);

  return (
    <CreateNewSessionTemplate
      headerTitle="Sacred Spaces"
      avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAvrKMK8ktzwlTbPhF8JxOFOUmTEOBpVoIt3kRKpL13cQqEYQHqgxx4Pf28iqQtNf6naYI3E_Vp5f0f0cpXeAKkgSaOh5JDFrJbCb1_rj7M8M-e9sCNrDFcjCGtUWugoaWKFVl4qztRbHKm9DnZD8cdfQ-8mTXllDQRO9uZQP5Dgxp48KiXXHH54fRW-xWVRSwzqMhgJzE7yFkHD9pPKJlpR8O2GiHSZqoLzxxYzby7iHSiThVn1T2hbP3MghyY3bh80oEmekBZ0lk"
      onMenuPress={onMenuPress}
      title="Create New Session"
      subtitle="Configure details for your community spiritual gathering."
      onCancelPress={() => navigation.goBack()}
      actions={
        <>
          <StyledButtonWrapper>
            <Button 
              onPress={onSubmit} 
              variant="primary" 
              label={isLoading ? "Publishing..." : "Create & Publish"}
              loading={isLoading}
              disabled={isLoading}
            />
          </StyledButtonWrapper>
          <StyledButtonWrapper>
            <Button 
              onPress={onSaveDraft} 
              variant="outline" 
              label="Save as Draft"
              disabled={isLoading}
            />
          </StyledButtonWrapper>
        </>
      }
    >
      {/* Session Title */}
      <FormFieldContainer>
        <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
          Session Title
        </Typography>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              value={value}
              onChangeText={onChange}
              placeholder="e.g., Wednesday Evening Meditation"
              placeholderTextColor={theme.colors.outline_variant}
              isError={!!errors.title}
            />
          )}
        />
        {errors.title && (
          <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
            {errors.title.message}
          </Typography>
        )}
      </FormFieldContainer>

      {/* Date Selection */}
      <FormFieldContainer>
        <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
          Select Day
        </Typography>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DaySelector selectedDate={value} onSelectDate={onChange} />
          )}
        />
        {errors.date && (
          <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
            {errors.date.message}
          </Typography>
        )}
      </FormFieldContainer>

      {/* Time Picker Row */}
      <FormRow>
        <FormFieldContainer flex={1}>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => {
              const minStartTime = new Date().toDateString() === watchedDate?.toDateString() ? new Date() : undefined;
              return (
                <TimePickerField
                  label="Start Time"
                  value={value}
                  onConfirm={onChange}
                  isError={!!errors.startTime}
                  errorMessage={errors.startTime?.message}
                  minimumDate={minStartTime}
                />
              );
            }}
          />
        </FormFieldContainer>
        <FormFieldContainer flex={1}>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => {
              return (
                <TimePickerField
                  label="End Time"
                  value={value}
                  onConfirm={onChange}
                  isError={!!errors.endTime}
                  errorMessage={errors.endTime?.message}
                  minimumDate={watchedStartTime}
                />
              );
            }}
          />
        </FormFieldContainer>
      </FormRow>

      {/* Location */}
      <FormFieldContainer>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <StyledDropdownField
                label="LOCATION"
                value={value}
                options={locationOptions}
                onSelect={onChange}
                isError={!!errors.location}
                errorMessage={errors.location?.message}
                placeholder={isLoading ? "Loading..." : "Select location"}
              />
            )}
          />
      </FormFieldContainer>

      {/* Seats & Max Users */}
      <FormRow>
        <FormFieldContainer flex={1}>
          <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
            SEATS
          </Typography>
          <Controller
            control={control}
            name="tokens"
            render={({ field: { onChange, value } }) => (
              <StyledInput
                value={String(value)}
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
                isError={!!errors.tokens}
              />
            )}
          />
          {errors.tokens && (
            <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
              {errors.tokens.message}
            </Typography>
          )}
        </FormFieldContainer>

        <FormFieldContainer flex={1}>
          <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
            MAX/USER
          </Typography>
          <Controller
            control={control}
            name="maxPeoplePerToken"
            render={({ field: { onChange, value } }) => (
              <StyledInput
                value={String(value)}
                onChangeText={(text) => onChange(Number(text))}
                keyboardType="numeric"
                isError={!!errors.maxPeoplePerToken}
              />
            )}
          />
          {errors.maxPeoplePerToken && (
            <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
              {errors.maxPeoplePerToken.message}
            </Typography>
          )}
        </FormFieldContainer>
      </FormRow>

      {/* Description */}
      <FormFieldContainer>
        <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
          Session Description
        </Typography>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <StyledInput
              value={value}
              onChangeText={onChange}
              placeholder="Describe the spiritual focus, what to bring, and expectations..."
              placeholderTextColor={theme.colors.outline_variant}
              multiline
              numberOfLines={3}
              isTextArea
              isError={!!errors.description}
            />
          )}
        />
        {errors.description && (
          <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
            {errors.description.message}
          </Typography>
        )}
      </FormFieldContainer>


    </CreateNewSessionTemplate>
  );
});

CreateNewSessionAdmin.displayName = 'CreateNewSessionAdmin';
