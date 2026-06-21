import React, { useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { scale } from '@/styles/scaling';
import { 
  FieldWrapper, PickerButton, DropdownContainer, OptionItem 
} from './DropdownField.styles';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownFieldProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const DropdownField = React.memo(({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
  isError,
  errorMessage
}: DropdownFieldProps) => {
  const theme = useTheme() as ThemeType;
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(o => o.value === value);

  return (
    <FieldWrapper>
      <Typography variant="label_caps" color="outline" style={{ marginBottom: 4 }}>
        {label}
      </Typography>
      
      <PickerButton 
        isError={isError} 
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Typography 
          variant="body_lg" 
          color={selectedOption ? 'on_surface' : 'outline_variant'}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Typography>
        <ChevronDown color={theme.colors.on_surface_variant as string} size={scale(20)} />
      </PickerButton>

      {isError && errorMessage && (
        <Typography variant="body_sm" color="error" style={{ marginTop: 4 }}>
          {errorMessage}
        </Typography>
      )}

      {open && (
        <DropdownContainer onStartShouldSetResponder={() => true}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
            {options.map((option) => (
              <OptionItem 
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
                activeOpacity={0.6}
              >
                <Typography 
                  variant="body_lg" 
                  color={option.value === value ? 'primary' : 'on_surface'}
                  style={{ fontWeight: option.value === value ? '700' : '500' }}
                >
                  {option.label}
                </Typography>
              </OptionItem>
            ))}
          </ScrollView>
        </DropdownContainer>
      )}
    </FieldWrapper>
  );
});

DropdownField.displayName = 'DropdownField';
