import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';
import { Box } from '@/components/atoms/Box';

const StyledInputContainer = styled(Box)<{ isError?: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme, isError }: { theme: ThemeType, isError?: boolean }) => 
    isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.xl}px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(4)}px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.on_surface};
  font-family: 'Inter';
  font-size: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

const IconWrapper = styled(Box)`
  margin-right: ${scale(8)}px;
`;

export interface InputProps extends TextInputProps {
  isError?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input = React.memo(({ isError, leftIcon, ...props }: InputProps) => {
  const theme = useTheme() as ThemeType;
  return (
    <StyledInputContainer isError={isError}>
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      <StyledTextInput
        placeholderTextColor={theme.colors.outline}
        {...props}
      />
    </StyledInputContainer>
  );
});

Input.displayName = 'Input';
