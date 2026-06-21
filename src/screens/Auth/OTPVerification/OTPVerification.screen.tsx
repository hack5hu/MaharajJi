import React from 'react';
import { useRoute } from '@react-navigation/native';
import { OTPVerificationTemplate } from '@/components/templates/OTPVerificationTemplate';
import { useOTPVerification } from './useOTPVerification';
import { ScreenContainer } from './OTPVerification.styles';
import { OTPVerificationScreenRouteProp } from './types.d';

export const OTPVerification = React.memo(() => {
  const route = useRoute<OTPVerificationScreenRouteProp>();
  const phoneNumber = route.params?.phoneNumber || '';
  const reqId = route.params?.reqId;
  const state = useOTPVerification(route.params?.isAdmin, phoneNumber, reqId);

  return (
    <ScreenContainer>
      <OTPVerificationTemplate 
        phone={phoneNumber}
        {...state} 
      />
    </ScreenContainer>
  );
});

OTPVerification.displayName = 'OTPVerification';
