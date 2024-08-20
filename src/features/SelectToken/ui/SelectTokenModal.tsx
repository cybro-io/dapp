import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { FixedSizeList } from 'react-window';
import AutoSize from 'react-virtualized-auto-sizer';

import { getUniqueTokenId } from '@/entities/SwapToken';
import { useSelectToken } from '@/features/SelectToken';
import { Modal, SearchInput, StarIconButton, Text, TextView } from '@/shared/ui';

import { SelectTokenCard } from './SelectTokenCard';
import { SelectChainsList } from './SelectChainsList';
import { useMediaQuery } from 'usehooks-ts';

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
    isEmptyFilteredTokens,
    isEmptyFavoriteTokens,
  } = useSelectToken(selectedTokenId);

  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  return (
    <Modal
      scrollBehavior="inside"
      onClose={closeModal}
      classNames={{ base: 'sm:min-h-[714px] sm:max-w-[718px]' }}
    >
      <Modal.Header>{'Select token\nto send'}</Modal.Header>
      <Modal.Body className="overflow-hidden">
        <SearchInput
          endContent={<StarIconButton {...registerFavorite()} />}
          placeholder="Symbol or address"
          {...registerSearch()}
        />

        <div className="flex flex-row gap-2 xl:gap-4 flex-1 overflow-hidden xl:min-h-0 min-h-[466px]">
          <SelectChainsList />
          <div className="rounded-[22px] bg-background-tableRow overflow-auto p-2 xl:p-4 pr-1 flex-[1.5] xl:flex-1">
            {isEmptyFilteredTokens && (
              <div className="w-full h-[75px] flex items-center justify-center text-center">
                <Text textView={TextView.BP3} className="opacity-40">
                  Nothing found. Try again.
                </Text>
              </div>
            )}

            {isEmptyFavoriteTokens && (
              <div className="w-full h-[75px] flex items-center justify-center text-center">
                <Text textView={TextView.BP3} className="opacity-40">
                  You don’t have any token in your Favourites
                </Text>
              </div>
            )}

            {!isEmptyFilteredTokens && !isEmptyFavoriteTokens && (
              <AutoSize>
                {size => (
                  <FixedSizeList
                    height={size.height}
                    width={size.width}
                    itemCount={filteredTokens.length}
                    itemSize={isSmallScreen ? 56 : 83}
                  >
                    {({ index, style }) => {
                      const token = filteredTokens[index];
                      const uniqueId = getUniqueTokenId(
                        token.address,
                        token.chainId,
                        token.chainFromId,
                      );
                      return (
                        <div style={{ ...style, marginBottom: 8 }}>
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
                )}
              </AutoSize>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});
