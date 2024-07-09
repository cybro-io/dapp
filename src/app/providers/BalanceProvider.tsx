'use client';

import React from 'react';

import { ethers } from 'ethers';

import { NATIVE_TOKENS } from '@/shared/const';
import { Money, Nullable, Token } from '@/shared/types';
import { fromWei } from '@/shared/utils';

type BalanceContextProps = {
  balance: Record<string, Money>;
  refetchBalance: (
    provider: Nullable<ethers.Provider>,
    signer: Nullable<ethers.Signer>,
    tokenContract: Nullable<Token>,
  ) => void;
};

const BalanceContext = React.createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = React.useState<Record<string, Money>>({});

  const refetchBalance = React.useCallback(
    async (
      provider: Nullable<ethers.Provider>,
      signer: Nullable<ethers.Signer>,
      tokenContract: Nullable<Token>,
    ) => {
      if (provider && signer && tokenContract) {
        let balance;
        let decimals;

        const tokenAddress = tokenContract.target as string;
        const userAddress = await signer.getAddress();

        if (!tokenContract) {
          throw new Error('Token not found');
        }

        if (NATIVE_TOKENS.includes(tokenAddress)) {
          balance = await provider.getBalance(userAddress);
          decimals = 8;
        } else {
          balance = await tokenContract.balanceOf(userAddress);
          decimals = await tokenContract.decimals();
        }

        setBalance(prevBalance => ({
          ...prevBalance,
          [tokenAddress]: fromWei(balance, Number(decimals)),
        }));
      }
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({ balance, refetchBalance }),
    [balance, refetchBalance],
  );

  return <BalanceContext.Provider value={contextValue}>{children}</BalanceContext.Provider>;
};

export const useBalanceContext = (): BalanceContextProps => {
  const context = React.useContext(BalanceContext);

  if (!context) {
    throw new Error('useBalanceContext must be used within an EthersProvider');
  }

  return context;
};
