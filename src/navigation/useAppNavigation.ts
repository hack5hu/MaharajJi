import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from './types';

export const useAppNavigation = () => useNavigation<RootStackNavigationProp>();
