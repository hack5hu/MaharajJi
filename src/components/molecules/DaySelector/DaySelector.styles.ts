import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '@/styles/scaling';
import { ThemeType } from '@/theme/theme';

export const GridContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${scale(8)}px;
`;

export const DayButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(8)}px;
  width: ${scale(50)}px;
  border-width: 1px;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.rounded.DEFAULT}px;
  margin-right: ${scale(4)}px;
  background-color: ${({ theme, isSelected }: { theme: ThemeType, isSelected: boolean }) => isSelected ? theme.colors.primary_container : theme.colors.surface};
  border-color: ${({ theme, isSelected }: { theme: ThemeType, isSelected: boolean }) => isSelected ? theme.colors.primary_container : theme.colors.outline_variant};
  min-width: ${scale(50)}px;
`;
