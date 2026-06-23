import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';
import { UserService } from '@/serviceManager/UserService';
import { useUserStore } from '@/stores/useUserStore';
import { Logger } from '@/utils/logger';
export const useAddNewCustomerAdmin = () => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, _setCountryCode] = useState('+91');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const handleFullNameChange = useCallback((text: string) => {
    setFullName(text);
    if (text.trim().length > 0) {
      setNameError(undefined);
    }
  }, []);

  const handlePhoneNumberChange = useCallback((text: string) => {
    // Only allow numeric input
    const cleanText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleanText);
    if (cleanText.length === 10) {
      setPhoneError(undefined);
    }
  }, []);

  const handleCountryCodePress = useCallback(() => {
    console.log('Open country code selector');
  }, []);

  const handleCancelPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddPress = useCallback(async () => {
    let isValid = true;

    if (!fullName.trim()) {
      setNameError(t('admin.add_new_customer.error_name'));
      isValid = false;
    } else {
      setNameError(undefined);
    }

    const phoneRegex = /^\d{10}$/; // Any 10 digits
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(t('admin.add_new_customer.error_phone'));
      isValid = false;
    } else {
      setPhoneError(undefined);
    }

    if (!isValid) return;

    setIsLoading(true);
    
    // The endpoint expects phoneNumber, name, location
    const res = await UserService.addCustomer({
      phoneNumber: phoneNumber,
      name: fullName.trim(),
      location: 'Unknown', // Required by payload schema
    });

    setIsLoading(false);

    if (res.success && res.data) {
      useUserStore.getState().fetchCustomers(true);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFullName('');
        setPhoneNumber('');
        navigation.goBack();
      }, 500);
    } else {
      setPhoneError(res.error || t('errors.server_error'));
      Logger.error('Failed to add customer', res.error);
    }
  }, [fullName, phoneNumber, navigation, t]);

  return {
    fullName,
    onFullNameChange: handleFullNameChange,
    phoneNumber,
    onPhoneNumberChange: handlePhoneNumberChange,
    countryCode,
    onCountryCodePress: handleCountryCodePress,
    onAddPress: handleAddPress,
    onCancelPress: handleCancelPress,
    isLoading,
    isSuccess,
    nameError,
    phoneError,
  };
};
