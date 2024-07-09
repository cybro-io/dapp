import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';

import { useBalanceContext, useEthers } from '@/app/providers';
import { Nullable, Token } from '@/shared/types';

export const useBalances = (tokenContract: Nullable<Token>) => {
  const { isConnected } = useWeb3ModalAccount();
  const { provider, signer, tokens } = useEthers();
  const { balance, refetchBalance } = useBalanceContext();
  const tokenAddress = tokenContract?.target as string;

  React.useEffect(() => {
    if (provider && signer && tokenContract && isConnected) {
      refetchBalance(provider, signer, tokenContract);
    }
  }, [provider, signer, tokens, refetchBalance, tokenContract, isConnected]);

  return {
    balance: balance[tokenAddress],
    refetchBalance: () => refetchBalance(provider, signer, tokenContract),
  };
};
