import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import InOutShadowIcon from '@/shared/assets/icons/in-out-shadow.svg';
import { Button, ButtonView, Heading, Modal } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

type SuccessSwapModalProps = {
  sentSymbol: string;
  sentAmount: string;
  receivedSymbol: string;
  receivedAmount: string;
  link: string;
};

export const SuccessSwapModal = NiceModal.create(
  ({ receivedSymbol, sentSymbol, receivedAmount, sentAmount, link }: SuccessSwapModalProps) => {
    const currentModal = NiceModal.useModal();

    return (
      <Modal onClose={() => currentModal.remove()}>
        <Modal.Header>Swap</Modal.Header>
        <div
          className={
            'pointer-events-none absolute bg-[url("/SwapSuccesBg.png")] bg-cover w-[375px] h-[199px] top-[64px]'
          }
        />
        <Modal.Body className="pt-6 gap-4 relative">
          <div className="flex flex-col gap-0.5 items-center">
            <Heading isYellow>
              {formatUserMoney(sentAmount)} {sentSymbol}
            </Heading>
            <Heading>sent</Heading>
          </div>

          <div className="w-[140px] h-[74px]" />
          <InOutShadowIcon className="absolute z-10 pointer-events-none top-2" />
          <div className="flex flex-col gap-0.5 items-center">
            <Heading isYellow>
              {formatUserMoney(receivedAmount)} {receivedSymbol}
            </Heading>
            <Heading>received</Heading>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <Button view={ButtonView.Secondary} onClick={() => window.open(link, '_blank')}>
              Explore transaction
            </Button>
            <Button onClick={() => currentModal.remove()}>To home page</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);