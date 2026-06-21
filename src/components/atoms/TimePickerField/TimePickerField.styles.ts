import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { scale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const PickerButton = styled(TouchableOpacity)<{ isError?: boolean }>`
  width: 100%;
  padding: ${scale(16)}px;
  border-width: 1px;
  border-color: ${({ theme, isError }: { theme: ThemeType, isError?: boolean }) => isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.DEFAULT}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FieldWrapper = styled.View`
  width: 100%;
`;
