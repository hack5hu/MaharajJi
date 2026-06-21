import React from 'react';
import { useWatch } from 'react-hook-form';
import { useLocale } from '@/hooks/useLocale';
import { Button } from '@/components/atoms/Button';
import { CreateNewSessionTemplate } from '@/components/templates/CreateNewSessionTemplate';
import { useCreateNewSessionAdmin } from './useCreateNewSessionAdmin';
import { SessionDetailsSection } from './components/SessionDetailsSection';
import { CapacitySection } from './components/CapacitySection';
import { BookingWindowSection } from './components/BookingWindowSection';
import { StyledButtonWrapper } from './CreateNewSessionAdmin.styles';

export const CreateNewSessionAdmin = React.memo(() => {
  const {
    form,
    onSubmit,
    onSaveDraft,
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
        <SessionDetailsSection
          control={control}
          errors={errors}
          isLoading={isLoading}
          locationOptions={locationOptions}
          dayAfterTomorrow={dayAfterTomorrow}
        />

        <CapacitySection
          control={control}
          errors={errors}
          isLoading={isLoading}
        />

        <BookingWindowSection
          control={control}
          errors={errors}
          tomorrow={tomorrow}
          watchedDate={watchedDate}
        />
      </>
    </CreateNewSessionTemplate>
  );
});

CreateNewSessionAdmin.displayName = 'CreateNewSessionAdmin';
