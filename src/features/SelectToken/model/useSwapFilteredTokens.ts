import React from 'react';

import { Token } from 'symbiosis-js-sdk';
import { useDebounceValue } from 'usehooks-ts';

import { getUniqueTokenId } from '@/entities/SwapToken';

export const useSwapFilteredTokens = (tokens: Token[], selectedTokenId: string) => {
  const [searchToken, setSearchToken] = React.useState('');
  const [debouncedSearchToken] = useDebounceValue(searchToken, 500);

  const withSortSelected = (tokens: Token[]) =>
    tokens.sort(tokenA =>
      getUniqueTokenId(tokenA.address, tokenA.chainId, tokenA.chainFromId) == selectedTokenId
        ? -1
        : 0,
    );

  const filteredTokens = React.useMemo(() => {
    if (!debouncedSearchToken) {
      return withSortSelected(tokens);
    }

    return withSortSelected(
      tokens.filter(({ symbol }) =>
        symbol?.toLowerCase().includes(debouncedSearchToken.toLowerCase()),
      ),
    );
  }, [debouncedSearchToken, tokens]);

  return { filteredTokens, setSearchToken, searchToken, withSortSelected };
};
