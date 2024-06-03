'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useMemo,
  useEffect,
} from 'react';

import { Maybe } from '@/shared/types';
import { Modal } from '@/shared/ui';

interface ModalContextType {
  currentModal: Maybe<Modal>;
  openModal: (id: Modal) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<Maybe<Modal>>(undefined);

  const openModal = (id: Modal) => {
    setCurrentModal(id);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
  };

  useEffect(() => {
    if (typeof currentModal !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [currentModal]);

  const contextValues = useMemo(() => ({ currentModal, openModal, closeModal }), [currentModal]);

  return <ModalContext.Provider value={contextValues}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
