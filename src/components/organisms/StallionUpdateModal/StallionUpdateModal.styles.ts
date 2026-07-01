import styled from 'styled-components/native';
import { ThemeType } from '@/theme/theme';
import { scale, moderateScale } from '@/styles/scaling';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: { theme: ThemeType }) => theme.spacing.xl}px;
`;

export const ModalContainer = styled.View`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.surface};
  border-radius: ${moderateScale(16)}px;
  padding: ${({ theme }: { theme: ThemeType }) => theme.spacing.xl}px;
  width: 100%;
  max-width: ${scale(320)}px;
  align-items: center;
`;

export const HeaderSection = styled.View`
  align-items: center;
`;
