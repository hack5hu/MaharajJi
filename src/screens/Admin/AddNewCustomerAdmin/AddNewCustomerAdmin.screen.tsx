import React from 'react';
import { AddNewCustomerTemplate } from '@/components/templates/AddNewCustomerTemplate';
import { useAddNewCustomerAdmin } from './useAddNewCustomerAdmin';
import { ScreenContainer } from './AddNewCustomerAdmin.styles';

export const AddNewCustomerAdmin = React.memo(() => {
  const state = useAddNewCustomerAdmin();

  return (
    <ScreenContainer>
      <AddNewCustomerTemplate {...state} />
    </ScreenContainer>
  );
});

AddNewCustomerAdmin.displayName = 'AddNewCustomerAdmin';
