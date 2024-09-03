import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { Button, ButtonView, Modal } from '@/shared/ui';

export const ErrorSwapModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  return (
    <Modal classNames={{ base: 'w-[375px]' }} onClose={() => currentModal.remove()}>
      <Modal.Header>Swap</Modal.Header>
      <div
        className={
          'bg-[url("/SwapUnknownError.png")] bg-center bg-contain w-full h-[295px] top-[64px]'
        }
      />
      <Modal.Body className="pt-4 gap-4 relative">
        <div className="flex flex-col gap-2">
          <Button view={ButtonView.Secondary} onClick={() => currentModal.remove()}>
            To home page
          </Button>
          <Button onClick={() => currentModal.remove()}>Try again</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});
