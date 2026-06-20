import React from 'react';
import { ConfirmationModal } from './ConfirmationModal';

export default {
  title: 'Organisms/ConfirmationModal',
  component: ConfirmationModal,
};

export const Default = () => (
  <ConfirmationModal
    visible={true}
    title="Cancel Booking?"
    message="Are you sure you want to cancel this session? This action cannot be undone."
    confirmLabel="Cancel Booking"
    cancelLabel="Keep Booking"
    onConfirm={() => console.log('Confirm')}
    onDismiss={() => console.log('Dismiss')}
  />
);
