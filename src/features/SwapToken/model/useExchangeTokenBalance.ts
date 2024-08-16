import React, { useState } from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Token } from 'symbiosis-js-sdk';

import { useSwap } from '@/features/SwapToken';
import { useGetTokenBalance, useSymbiosis } from '@/shared/lib';

export const useExchangeTokenBalance = (token: Token) => {
  const { subscribeSuccessSwap } = useSwap();
  const { address } = useWeb3ModalAccount();
  const symbiosis = useSymbiosis();
  const { isLoading, fetchBalance } = useGetTokenBalance();

  const [balance, setBalance] = useState('0');

  const getTokenBalance = (token: Token, address: string) => {
    if (!address) return;

    const provider = symbiosis.providers.get(token.chainId);
    if (provider) {
      fetchBalance(token, provider, address).then(setBalance).catch(setBalance);
    }
  };

  React.useEffect(() => {
    getTokenBalance(token, address);

    const subscriber = subscribeSuccessSwap(() => {
      getTokenBalance(token, address);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, [token, address]);

  return { balance, isLoading };
};
