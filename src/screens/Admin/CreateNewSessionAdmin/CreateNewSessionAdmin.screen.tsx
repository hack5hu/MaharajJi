import React from 'react';
import { Switch } from 'react-native';
import { Controller, useWatch } from 'react-hook-form';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Box } from '@/components/atoms/Box';
import { CreateNewSessionTemplate } from '@/components/templates/CreateNewSessionTemplate';
import { DaySelector } from '@/components/molecules/DaySelector';
import { TimePickerField } from '@/components/atoms/TimePickerField';
// Removed raw DropdownField import; using StyledDropdownField from styles
import { useCreateNewSessionAdmin } from './useCreateNewSessionAdmin';
import {
  FormRow,
  FormFieldContainer,
  StyledInput,
  ToggleContainer,
  StyledButtonWrapper,
  StyledDropdownField,
} from './CreateNewSessionAdmin.styles';

export const CreateNewSessionAdmin = React.memo(() => {
  const theme = useTheme() as ThemeType;
  const {
    form,
    onSubmit,
    onSaveDraft,
    onMenuPress,
    isLoading,
    locations,
    navigation,
  } = useCreateNewSessionAdmin();
  const {
    control,
    formState: { errors },
  } = form;
  const { t } = useLocale();

  const watchedDate = useWatch({ control, name: 'date' });
  const watchedStartTime = useWatch({ control, name: 'startTime' });

  const locationOptions = React.useMemo(() => {
    return locations.map(loc => ({ label: loc.name, value: loc.name }));
  }, [locations]);

  const dayAfterTomorrow = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d;
  }, []);

  const tomorrow = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  return (
    <CreateNewSessionTemplate
      title={t('admin.create_session.title')}
      subtitle={t('admin.create_session.subtitle')}
      onCancelPress={() => navigation.goBack()}
      actions={
        <>
          <StyledButtonWrapper>
            <Button
              onPress={onSubmit}
              variant="primary"
              label={isLoading ? t('admin.create_session.publish_loading') : t('admin.create_session.publish_btn')}
              loading={isLoading}
              disabled={isLoading}
            />
          </StyledButtonWrapper>
          <StyledButtonWrapper>
            <Button
              onPress={onSaveDraft}
              variant="outline"
              label={t('admin.create_session.save_draft_btn')}
              disabled={isLoading}
            />
          </StyledButtonWrapper>
        </>
      }
    >
      <>
        {/* Session Title */}
        <FormFieldContainer>
          <Typography
            variant="label_caps"
            color="outline"
            style={{ marginBottom: 4 }}
          >
            {t('admin.create_session.session_title_label')} <Typography variant="label_caps" color="error">*</Typography>
          </Typography>
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
            <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
              {t(errors.title.message as any)}
            </Typography>
          )}
        </FormFieldContainer>

        {/* Date Selection */}
        <FormFieldContainer>
          <Typography
            variant="label_caps"
            color="outline"
            style={{ marginBottom: 4 }}
          >
            {t('admin.create_session.event_day_label')} <Typography variant="label_caps" color="error">*</Typography>
          </Typography>
          <Typography
            variant="body_sm"
            color="on_surface_variant"
            style={{ marginBottom: 12 }}
          >
            {t('admin.create_session.event_day_desc')}
          </Typography>
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
            <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
              {t(errors.date.message as any)}
            </Typography>
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

        {/* Seats & Max Users */}
        <FormRow>
          <FormFieldContainer flex={1}>
            <Typography
              variant="label_caps"
              color="outline"
              style={{ marginBottom: 4 }}
            >
              {t('admin.create_session.seats_label')} <Typography variant="label_caps" color="error">*</Typography>
            </Typography>
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
              <Typography
                variant="body_sm"
                color="error"
                style={{ marginTop: 4 }}
              >
                {t(errors.tokens.message as any)}
              </Typography>
            )}
          </FormFieldContainer>

          <FormFieldContainer flex={1}>
            <Typography
              variant="label_caps"
              color="outline"
              style={{ marginBottom: 4 }}
            >
              {t('admin.create_session.max_user_label')} <Typography variant="label_caps" color="error">*</Typography>
            </Typography>
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
              <Typography
                variant="body_sm"
                color="error"
                style={{ marginTop: 4 }}
              >
                {t(errors.maxPeoplePerToken.message as any)}
              </Typography>
            )}
          </FormFieldContainer>
        </FormRow>

        {/* Booking Live Slot */}
        <FormFieldContainer>
          <Typography
            variant="label_caps"
            color="outline"
            style={{ marginBottom: 4 }}
          >
            {t('admin.create_session.booking_open_label')} <Typography variant="label_caps" color="error">*</Typography>
          </Typography>
          <Typography
            variant="body_sm"
            color="on_surface_variant"
            style={{ marginBottom: 12 }}
          >
            {t('admin.create_session.booking_open_desc')}
          </Typography>
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
            <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
              {t(errors.bookingOpenDate.message as any)}
            </Typography>
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
    </CreateNewSessionTemplate>
  );
});

CreateNewSessionAdmin.displayName = 'CreateNewSessionAdmin';
