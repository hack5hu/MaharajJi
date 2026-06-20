import { useState, useCallback } from 'react';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import { useLocale } from '@/hooks/useLocale';

export const useAddNewCustomerAdmin = () => {
  const navigation = useAppNavigation();
  const { t } = useLocale();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
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

  const handleAddPress = useCallback(() => {
    let isValid = true;

    if (!fullName.trim()) {
      setNameError(t('admin.add_new_customer.error_name'));
      isValid = false;
    } else {
      setNameError(undefined);
    }

    const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and has 10 digits
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(t('admin.add_new_customer.error_phone'));
      isValid = false;
    } else {
      setPhoneError(undefined);
    }

    if (!isValid) return;

    // Simulate API flow matching the HTML mockup animation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        // Clear fields
        setFullName('');
        setPhoneNumber('');
        // Navigate back to the customer list
        navigation.goBack();
      }, 2000);
    }, 1500);
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
