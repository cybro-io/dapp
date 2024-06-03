import React from 'react';

import { ModalLayout } from '@/shared/ui/modals/ModalLayout';

export enum Modal {
  FirstModal,
}

export const ModalIdToView: Record<Modal, React.ReactElement> = {
  [Modal.FirstModal]: (
    <ModalLayout title={'test'}>
      <h1>Test</h1>
    </ModalLayout>
  ),
};
