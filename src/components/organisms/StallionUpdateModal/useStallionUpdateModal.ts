import { useState, useEffect, useCallback } from 'react';
import { useStallionUpdate, restart } from 'react-native-stallion';

export const useStallionUpdateModal = () => {
  const { isRestartRequired } = useStallionUpdate();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isRestartRequired) {
      setModalVisible(true);
    }
  }, [isRestartRequired]);

  const handleRestart = useCallback(() => {
    setModalVisible(false);
    restart();
  }, []);

  return {
    modalVisible,
    handleRestart,
  };
};
