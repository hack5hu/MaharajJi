import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';

export const FieldWrapper = styled.View`
  margin-bottom: ${verticalScale(4)}px;
  position: relative;
  z-index: 1000;
`;

export const PickerButton = styled(TouchableOpacity)<{ isError?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.outline_variant};
  border-radius: ${({ theme }) => theme.rounded.DEFAULT}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ModalOverlay = styled(TouchableOpacity)`
  flex: 1;
  background-color: transparent;
`;

export const DropdownContainer = styled(View)`
  position: absolute;
  top: ${verticalScale(56)}px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${scale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.surface_container_highest};
  max-height: ${verticalScale(200)}px;
  z-index: 2000;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
`;

export const OptionItem = styled(TouchableOpacity)`
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_container_highest};
`;
