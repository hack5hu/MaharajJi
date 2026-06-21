import { ReactNode } from 'react';

export interface BookSessionTemplateProps {
  headerTitle?: string;
  onBackPress: () => void;
  children: ReactNode;
}
