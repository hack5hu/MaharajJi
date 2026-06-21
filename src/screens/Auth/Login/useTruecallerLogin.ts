import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useLocale } from '@/hooks/useLocale';
import {
  useTruecaller,
  type TruecallerAndroidResponse,
} from '@ajitpatel28/react-native-truecaller';
import { Logger } from '@/utils/logger';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { storage, StorageKeys } from '@/utils/storage';
import {
  USER_DISMISS_CODES,
  TRANSIENT_SDK_CODES,
  executeTruecallerAuth,
  getTruecallerOptions,
} from './truecallerHelper';

interface UseTruecallerLoginProps {
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
}

export const useTruecallerLogin = ({ setLoading, setError }: UseTruecallerLoginProps) => {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [isTruecallerSupported, setIsTruecallerSupported] = useState(false);
  const [hasDismissedTruecaller, setHasDismissedTruecaller] = useState(false);

  const verifyTruecaller = useCallback(
    async (params: { authorizationCode?: string; codeVerifier?: string }) => {
      setLoading(true);
      setError(undefined);
      try {
        if (!params.authorizationCode) {
          setError(t('user.errors.server_error', { defaultValue: 'Invalid credentials' }));
          setLoading(false);
          return;
        }

        const result = await executeTruecallerAuth(
          params.authorizationCode,
          params.codeVerifier,
        );

        if (result.success && result.data) {
          const responseData = result.data;

          // Store tokens and user details
          storage.set(StorageKeys.AUTH_TOKEN, responseData.token);
          storage.set(StorageKeys.REFRESH_TOKEN, responseData.refreshToken);
          storage.set(StorageKeys.USER_ROLE, responseData.role);
          storage.set(StorageKeys.USER_ID, responseData.userId);

          // Save profile info in MMKV
          const isUserAdmin = responseData.role === 'ADMIN' || responseData.role === 'SUPER_ADMIN';
          const profile = {
            name: isUserAdmin ? 'Admin User' : 'User',
            phone: '', // Will populate later from profile API
          };
          storage.set(StorageKeys.USER_PROFILE, JSON.stringify(profile));

          if (isUserAdmin) {
            navigation.navigate('AdminDashboardHome');
          } else {
            navigation.navigate('HomeBookingStatus');
          }
        } else {
           setError(result.error || t('user.errors.server_error'));
        }
      } catch (error: any) {
        Logger.error('Truecaller login failed', error);
        setError(error.message || t('user.errors.server_error'));
      } finally {
        setLoading(false);
      }
    },
    [navigation, t, setLoading, setError],
  );

  const handleTruecallerSuccess = useCallback(
    (data: {
      accessToken?: string;
      authorizationCode?: string;
      codeVerifier?: string;
    }) => verifyTruecaller(data),
    [verifyTruecaller],
  );

  const androidSuccessHandler = useCallback(
    (data: TruecallerAndroidResponse) => {
      const accessToken = (data as any).accessToken || '';
      handleTruecallerSuccess({
        accessToken,
        authorizationCode: data.authorizationCode,
        codeVerifier: (data as any).codeVerifier,
      });
    },
    [handleTruecallerSuccess],
  );

  const {
    initializeTruecallerSDK,
    openTruecallerForVerification,
    isSdkUsable,
    userProfile,
    error: truecallerError,
  } = useTruecaller(getTruecallerOptions(androidSuccessHandler));

  // Robust initialization logic with delay and retries
  useEffect(() => {
    let active = true;
    let timerId: ReturnType<typeof setTimeout>;
    let retries = 0;
    const maxRetries = 3;

    const init = () => {
      Logger.log(`Initializing Truecaller SDK (attempt ${retries + 1})...`);
      initializeTruecallerSDK()
        .then(() => isSdkUsable())
        .then(supported => {
          Logger.log('Truecaller SDK support check:', supported);
          if (active) {
            setIsTruecallerSupported(supported);
          }
        })
        .catch(err => {
          Logger.error(`Truecaller SDK init attempt ${retries + 1} failed:`, err);
          if (active) {
            if (retries < maxRetries) {
              retries++;
              timerId = setTimeout(init, 1000);
            } else {
              setIsTruecallerSupported(false);
            }
          }
        });
    };

    // Delay initialization to let Android Activity mount
    timerId = setTimeout(init, 500);

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [initializeTruecallerSDK, isSdkUsable]);

  useEffect(() => {
    if (userProfile) {
      handleTruecallerSuccess({
        accessToken: (userProfile as any).accessToken || '',
      });
    }
  }, [userProfile, handleTruecallerSuccess]);

  useEffect(() => {
    if (!truecallerError) return;

    const errorStr = String(truecallerError);

    if (USER_DISMISS_CODES.test(errorStr)) {
      setHasDismissedTruecaller(true);
    } else if (TRANSIENT_SDK_CODES.test(errorStr)) {
      Logger.log('Truecaller transient SDK error ignored:', errorStr);
    } else {
      setError(errorStr);
    }
  }, [truecallerError, setError]);

  const handleTruecallerLogin = async () => {
    Keyboard.dismiss();
    try {
      if (await isSdkUsable()) {
        setHasDismissedTruecaller(false);
        await openTruecallerForVerification();
      } else {
        setError(t('user.login.truecaller_unavailable', { defaultValue: 'Truecaller is unavailable' }));
      }
    } catch (err) {
      Logger.error('Could not start Truecaller login', err);
      setError(t('user.login.truecaller_start_error', { defaultValue: 'Could not start Truecaller' }));
    }
  };

  const handleInputFocus = async () => {
    if (isTruecallerSupported && !hasDismissedTruecaller) {
      Keyboard.dismiss();
      await handleTruecallerLogin();
    }
  };

  return {
    isTruecallerSupported,
    hasDismissedTruecaller,
    handleTruecallerLogin,
    handleInputFocus,
  };
};
