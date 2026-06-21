import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const GridContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2%;
`;

export const DayButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(8)}px;
  width: 18%;
  border-width: 1px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.DEFAULT}px;
  background-color: ${({ theme, isSelected }: { theme: ThemeType, isSelected: boolean }) => isSelected ? theme.colors.primary_container : theme.colors.surface};
  border-color: ${({ theme, isSelected }: { theme: ThemeType, isSelected: boolean }) => isSelected ? theme.colors.primary_container : theme.colors.outline_variant};
`;
