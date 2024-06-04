'use client';

import React from 'react';

import { Modal } from '@/app/providers';
import { Maybe } from '@/shared/types';

interface ModalContextType {
  currentModal: Maybe<Modal>;
  openModal: (id: Modal) => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = React.useState<Maybe<Modal>>(undefined);

  const openModal = (id: Modal) => {
    setCurrentModal(id);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
  };

  React.useEffect(() => {
    if (typeof currentModal !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [currentModal]);

  const contextValues = React.useMemo(
    () => ({ currentModal, openModal, closeModal }),
    [currentModal],
  );

  return <ModalContext.Provider value={contextValues}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
