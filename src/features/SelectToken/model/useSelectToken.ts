import NiceModal from '@ebay/nice-modal-react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Token } from 'symbiosis-js-sdk';

import { useSwapTokens } from '@/entities/SwapToken';
import { useSwapFavoriteTokens } from '@/features/SelectToken';
import { useSwapFilteredTokens } from '@/features/SelectToken/model/useSwapFilteredTokens';

export const useSelectToken = (selectedTokenId: string) => {
  const currentModal = NiceModal.useModal();

  const { tokens } = useSwapTokens();

  const {
    favoriteTokens,
    addFavoriteToken,
    removeFavoriteToken,
    isFavoriteToken,
    onlyFavorite,
    toggleOnlyFavorite,
  } = useSwapFavoriteTokens(tokens);

  const { filteredTokens, setSearchToken, searchToken } = useSwapFilteredTokens(
    favoriteTokens,
    selectedTokenId,
  );

  const handleToggleFavorite = (state: boolean, uniqueId: string) => {
    state ? addFavoriteToken(uniqueId) : removeFavoriteToken(uniqueId);
  };

  const { address } = useWeb3ModalAccount();

  const registerSearch = () => ({
    value: searchToken,
    onValueChange: setSearchToken,
  });

  const registerFavorite = () => ({
    isActive: onlyFavorite,
    onClick: toggleOnlyFavorite,
  });

  const closeModal = () => currentModal.remove();

  const handleSelectToken = (token: Token) => {
    currentModal.resolve(token);
    currentModal.remove();
  };

  return {
    address,
    handleToggleFavorite,
    filteredTokens,
    registerSearch,
    registerFavorite,
    isFavoriteToken,
    handleSelectToken,
    closeModal,
  };
};