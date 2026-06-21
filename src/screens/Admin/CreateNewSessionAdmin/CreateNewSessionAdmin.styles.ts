import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { TextInput } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import { DropdownField } from '@/components/atoms/DropdownField';
import { Typography } from '@/components/atoms/Typography';

export const FormRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  gap: ${scale(16)}px;
`;

export const FormFieldContainer = styled(Box)<{ flex?: number; mb?: number }>`
  ${({ flex }) => (flex ? `flex: ${flex};` : 'width: 100%;')}
  ${({ mb }) => (mb ? `margin-bottom: ${verticalScale(mb)}px;` : '')}
`;

export const StyledInput = styled(TextInput)<{ isError?: boolean; isTextArea?: boolean }>`
  width: 100%;
  padding: ${scale(16)}px;
  background-color: ${({ theme, isError }: { theme: ThemeType; isError?: boolean }) =>
    isError ? theme.colors.error_container : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme, isError }: { theme: ThemeType; isError?: boolean }) =>
    isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.DEFAULT}px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface};
  font-family: 'Inter';
  font-size: 16px;
  ${({ isTextArea }) => (isTextArea ? `height: ${verticalScale(100)}px; text-align-vertical: top;` : '')}
`;

export const ToggleContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${scale(16)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
`;

export const StyledButtonWrapper = styled(Box)`
  width: 100%;
  margin-top: ${verticalScale(8)}px;
`;

export const StyledDropdownField = styled(DropdownField)`
  width: 100%;
`;

export const FieldLabel = styled(Typography)`
  margin-bottom: ${verticalScale(4)}px;
`;

export const FieldDescription = styled(Typography)`
  margin-bottom: ${verticalScale(12)}px;
`;

export const ErrorText = styled(Typography)`
  margin-top: ${verticalScale(4)}px;
`;
