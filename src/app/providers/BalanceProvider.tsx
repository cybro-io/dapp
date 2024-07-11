'use client';

import React from 'react';

import { ethers } from 'ethers';

import { NATIVE_TOKENS } from '@/shared/const';
import { Money, Nullable, Token, Vault, VaultMin } from '@/shared/types';
import { convertToUsd, fromWei, isInvalid } from '@/shared/utils';

type BalanceContextProps = {
  balance: Record<string, Money>;
  vaultDeposit: Record<string, Money>;
  vaultDepositUsd: Record<string, Money>;
  refetchBalance: (
    provider: Nullable<ethers.Provider>,
    signer: Nullable<ethers.Signer>,
    tokenContract: Nullable<Token>,
    vaultContract?: Nullable<Vault | VaultMin>,
    tokenPrice?: Nullable<number>,
  ) => void;
};

const BalanceContext = React.createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = React.useState<Record<string, Money>>({});
  const [vaultDeposit, setVaultDeposit] = React.useState<Record<string, Money>>({});
  const [vaultDepositUsd, setVaultDepositUsd] = React.useState<Record<string, Money>>({});

  const getUserBalance = React.useCallback(
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
          decimals = 18;
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

  const getVaultDeposit = React.useCallback(
    async (
      vaultContract: Nullable<Vault | VaultMin>,
      signer: Nullable<ethers.Signer>,
      tokenPrice: Nullable<number>,
    ) => {
      if (vaultContract && signer && !isInvalid(tokenPrice)) {
        const vaultAddress = vaultContract.target as string;
        const userAddress = await signer.getAddress();
        const sharePrice = await vaultContract.sharePrice();
        const decimals = Number(await vaultContract.decimals());

        const userTotalShares = await vaultContract.balanceOf(userAddress);

        const availableFunds = fromWei(userTotalShares, decimals);
        const availableFundsTokens = availableFunds
          ? (userTotalShares * sharePrice) / BigInt(10 ** decimals)
          : 0;
        const availableFundsUsd = convertToUsd(fromWei(availableFundsTokens, decimals), tokenPrice);

        setVaultDeposit(prevState => ({
          ...prevState,
          [vaultAddress]: availableFunds,
        }));

        setVaultDepositUsd(prevState => ({
          ...prevState,
          [vaultAddress]: availableFundsUsd,
        }));
      }
    },
    [],
  );

  const refetchBalance = React.useCallback(
    (
      provider: Nullable<ethers.Provider>,
      signer: Nullable<ethers.Signer>,
      tokenContract: Nullable<Token>,
      vaultContract?: Nullable<Vault | VaultMin>,
      tokenPrice?: Nullable<number>,
    ) => {
      getUserBalance(provider, signer, tokenContract);
      getVaultDeposit(vaultContract, signer, tokenPrice);
    },
    [getUserBalance, getVaultDeposit],
  );

  const contextValue = React.useMemo(
    () => ({ balance, vaultDeposit, vaultDepositUsd, refetchBalance }),
    [balance, refetchBalance, vaultDeposit, vaultDepositUsd],
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
