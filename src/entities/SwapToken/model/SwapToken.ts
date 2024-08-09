import React from 'react';

import { GAS_TOKEN, isBtc, isTronToken, Token, tokenEquals } from 'symbiosis-js-sdk';

import { swapTokens } from '@/entities/SwapToken';
import { TYPE_SYMBIOSIS, useSymbiosis } from '@/shared/lib';

export const useSwapTokens = () => {
  const symbiosis = useSymbiosis();

  const tokens = React.useMemo(() => {
    const chains = symbiosis.chains();
    const gasTokens = Object.values(GAS_TOKEN).filter(
      token => chains.findIndex(({ id }) => id === token.chainId) !== -1,
    );

    const symbiosisTokens = symbiosis.tokens().map(token => new Token(token));

    const allTokens = gasTokens.concat(
      symbiosisTokens,
      TYPE_SYMBIOSIS === 'mainnet' ? swapTokens : [],
    );

    return allTokens.filter(
      (token, index) =>
        !isTronToken(token) &&
        !isBtc(token.chainId) &&
        allTokens.findIndex(findToken => tokenEquals(findToken, token)) === index,
    );
  }, []);

  return { tokens };
};
