export interface AddNewCustomerTemplateProps {
  fullName: string;
  onFullNameChange: (text: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (text: string) => void;
  countryCode: string;
  onCountryCodePress: () => void;
  onAddPress: () => void;
  onCancelPress: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  nameError?: string;
  phoneError?: string;
}
