import React from 'react';
import { LoginTemplate } from '@/components/templates/LoginTemplate';
import { useLogin } from './useLogin';
import { ScreenContainer } from './Login.styles';

export const Login = React.memo(() => {
  const state = useLogin();

  return (
    <ScreenContainer>
      <LoginTemplate {...state} />
    </ScreenContainer>
  );
});

Login.displayName = 'Login';
