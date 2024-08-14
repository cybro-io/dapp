import React from 'react';

import { Token } from 'symbiosis-js-sdk';
import { useDebounceValue } from 'usehooks-ts';

import { getUniqueTokenId } from '@/entities/SwapToken';
import { useSelectChain } from '@/features/SelectToken';

export const useSwapFilteredTokens = (tokens: Token[], selectedTokenId: string) => {
  const { selectedChain } = useSelectChain();

  const [searchToken, setSearchToken] = React.useState('');
  const [debouncedSearchToken] = useDebounceValue(searchToken, 500);

  const withSortSelected = (tokens: Token[]) =>
    tokens.sort(tokenA =>
      getUniqueTokenId(tokenA.address, tokenA.chainId, tokenA.chainFromId) == selectedTokenId
        ? -1
        : 0,
    );

  const withFilterByChain = (tokens: Token[]) =>
    selectedChain ? tokens.filter(({ chainId }) => selectedChain === chainId) : tokens;

  const withFilterBySymbol = (tokens: Token[]) =>
    debouncedSearchToken
      ? tokens.filter(({ symbol }) =>
          symbol?.toLowerCase().includes(debouncedSearchToken.toLowerCase()),
        )
      : tokens;

  const filteredTokens = React.useMemo(() => {
    if (!debouncedSearchToken) {
      return withFilterByChain(withSortSelected(tokens));
    }

    return withFilterByChain(withFilterBySymbol(withSortSelected(tokens)));
  }, [debouncedSearchToken, tokens, selectedChain]);

  const isEmptyFilteredTokens = filteredTokens.length < 1 && debouncedSearchToken;

  return { filteredTokens, isEmptyFilteredTokens, setSearchToken, searchToken, withSortSelected };
};
