import React from 'react';
import { Modal } from 'react-native';
import { ThemeType } from '@/theme/theme';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/hooks/useLocale';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import {
  Overlay,
  ModalContainer,
  HeaderSection,
} from './StallionUpdateModal.styles';
import { useStallionUpdateModal } from './useStallionUpdateModal';

export const StallionUpdateModal = React.memo(() => {
  const { t } = useLocale();
  const theme = useTheme() as ThemeType;
  const { modalVisible, handleRestart } = useStallionUpdateModal();

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <HeaderSection>
            <Typography
              variant="title_md"
              color="on_surface"
              style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}
            >
              {t('common.update_ready')}
            </Typography>
          </HeaderSection>
          <Button
            label={t('common.restart_app')}
            variant="primary"
            onPress={handleRestart}
            fullWidth
          />
        </ModalContainer>
      </Overlay>
    </Modal>
  );
});

StallionUpdateModal.displayName = 'StallionUpdateModal';
