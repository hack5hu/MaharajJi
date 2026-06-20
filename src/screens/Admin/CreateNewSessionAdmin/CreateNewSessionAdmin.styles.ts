import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { TextInput } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const FormRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  gap: ${scale(16)}px;
`;

export const FormFieldContainer = styled(Box)<{ flex?: number }>`
  ${({ flex }) => flex ? `flex: ${flex};` : 'width: 100%;'}
`;

export const StyledInput = styled(TextInput)<{ isError?: boolean; isTextArea?: boolean }>`
  width: 100%;
  padding: ${scale(16)}px;
  border-width: 1px;
  border-color: ${({ theme, isError }: { theme: ThemeType, isError?: boolean }) => isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.DEFAULT}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface};
  font-family: 'Inter';
  font-size: 16px;
  ${({ isTextArea }) => isTextArea ? `height: ${verticalScale(100)}px; text-align-vertical: top;` : ''}
`;

export const ToggleContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${scale(16)}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_low};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
`;
