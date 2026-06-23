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
  border-radius: ${({ theme }) => theme.rounded.DEFAULT}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  background-color: ${({ theme, isError }) => isError ? theme.colors.error_container : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.outline_variant};
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
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${scale(12)}px;
  max-height: ${verticalScale(200)}px;
  z-index: 2000;
  elevation: 5;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
`;

export const OptionItem = styled(TouchableOpacity)`
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
`;
