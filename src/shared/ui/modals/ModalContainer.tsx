'use client';

import React from 'react';

import { useModal } from '@/app/providers';
import { ComponentWithProps } from '@/shared/types';
import { ModalIdToView } from '@/shared/ui';

type ModalContainerProps = {};

export const ModalContainer: ComponentWithProps<ModalContainerProps> = () => {
  const { currentModal } = useModal();

  if (typeof currentModal === 'undefined') {
    return null;
  }

  const Modal = ModalIdToView[currentModal];

  return <React.Fragment>{Modal}</React.Fragment>;
};
