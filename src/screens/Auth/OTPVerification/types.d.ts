import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';

export type OTPVerificationScreenRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

export interface OTPVerificationProps {
  route: OTPVerificationScreenRouteProp;
}
