import React from 'react';
import { Modal } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AlertTriangle } from 'lucide-react-native';
import { ThemeType } from '@/theme/theme';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { scale } from '@/styles/scaling';
import {
  ModalBackdrop,
  ModalContainer,
  IconWrapper,
  TextContainer,
  ButtonContainer,
} from './ConfirmationModal.styles';
import { ConfirmationModalProps } from './types.d';

export const ConfirmationModal = React.memo(({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onDismiss,
  loading = false,
  style,
}: ConfirmationModalProps) => {
  const theme = useTheme() as ThemeType;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <ModalBackdrop>
        <ModalContainer style={style}>
          <IconWrapper>
            <AlertTriangle color={theme.colors.error as string} size={scale(28)} />
          </IconWrapper>
          <TextContainer>
            <Typography variant="headline_md" color="on_surface" style={{ fontWeight: '700', marginBottom: 8, textAlign: 'center' }}>
              {title}
            </Typography>
            <Typography variant="body_sm" color="on_surface_variant" style={{ textAlign: 'center', lineHeight: 20 }}>
              {message}
            </Typography>
          </TextContainer>
          <ButtonContainer>
            <Button
              label={confirmLabel}
              onPress={onConfirm}
              variant="primary"
              loading={loading}
              fullWidth
              style={{ backgroundColor: theme.colors.error }}
            />
            <Button
              label={cancelLabel}
              onPress={onDismiss}
              variant="outline"
              disabled={loading}
              fullWidth
            />
          </ButtonContainer>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
});

ConfirmationModal.displayName = 'ConfirmationModal';
