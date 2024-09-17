import NiceModal from '@ebay/nice-modal-react';
import { Token } from 'symbiosis-js-sdk';

import { SelectTokenModal } from '@/features/SelectToken';

export const useSelectTokenModal = () => {
  const modalSelectToken = NiceModal.useModal(SelectTokenModal);

  const openModal = (
    selectedTokenId: string,
    callback: (token: Token) => void,
  ) => {
    modalSelectToken
      .show({ selectedTokenId })
      .then((token) => callback(token as Token));
  };

  return { openModal };
};
