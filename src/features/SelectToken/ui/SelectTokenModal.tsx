import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { FixedSizeList } from 'react-window';

import { getUniqueTokenId } from '@/entities/SwapToken';
import { useSelectToken } from '@/features/SelectToken';
import { Modal, StarIconButton, SearchInput } from '@/shared/ui';

import { SelectTokenCard } from './SelectTokenCard';

type SelectTokenProps = {
  selectedTokenId: string;
};

export const SelectTokenModal = NiceModal.create<SelectTokenProps>(({ selectedTokenId }) => {
  const {
    filteredTokens,
    handleToggleFavorite,
    registerSearch,
    isFavoriteToken,
    registerFavorite,
    handleSelectToken,
    closeModal,
  } = useSelectToken(selectedTokenId);

  return (
    <Modal scrollBehavior="inside" onClose={closeModal}>
      <Modal.Header>{'Select token\nto send'}</Modal.Header>
      <Modal.Body className="overflow-hidden">
        <SearchInput
          endContent={<StarIconButton {...registerFavorite()} />}
          placeholder="Search"
          {...registerSearch()}
        />

        <div className="rounded-[22px] bg-background-tableRow overflow-auto p-2">
          <FixedSizeList height={506} width={310} itemCount={filteredTokens.length} itemSize={75}>
            {({ index, style }) => {
              const token = filteredTokens[index];
              const uniqueId = getUniqueTokenId(token.address, token.chainId, token.chainFromId);

              return (
                <div style={style}>
                  <SelectTokenCard
                    key={index}
                    token={token}
                    onClickFavorite={state => handleToggleFavorite(state, uniqueId)}
                    isFavorite={isFavoriteToken(uniqueId)}
                    isActive={selectedTokenId === uniqueId}
                    onSelectToken={handleSelectToken}
                  />
                </div>
              );
            }}
          </FixedSizeList>
        </div>
      </Modal.Body>
    </Modal>
  );
});
