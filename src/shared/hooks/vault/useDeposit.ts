'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Contract, ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Nullable } from '@/shared/types';
import { VaultType } from '@/shared/utils';

type UseDeposit = {
  deposit: (amount: number) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
  error: Nullable<string>;
};

export const useDeposit = (vaultType: VaultType): UseDeposit => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const {
    usdbContract,
    usdbVaultContract,
    wethVaultContract,
    wethContract,
    wbtcVaultContract,
    wbtcContract,
  } = useEthers();

  let token: Nullable<Contract>;
  let vault: Nullable<Contract>;

  switch (vaultType) {
    case VaultType.USDB:
      token = usdbContract;
      vault = usdbVaultContract;
      break;
    case VaultType.WETH:
      token = wethContract;
      vault = wethVaultContract;
      break;
    case VaultType.WBTC:
      token = wbtcContract;
      vault = wbtcVaultContract;
      break;
  }

  const deposit = React.useCallback(
    async (amount: number) => {
      if (!token || !vault || !isConnected) {
        setError('Error');
        return;
      }

      try {
        setIsLoading(true);
        const vaultAddress = vault.target;
        const decimals = await token.decimals();
        const weiAmount = ethers.parseUnits(String(amount), decimals);

        const approveTx = await token.approve(vaultAddress, weiAmount);
        setButtonMessage('Approving...');
        await approveTx.wait();

        const depositTx = await vault.deposit(weiAmount, address);
        setButtonMessage('Depositing...');
        await depositTx.wait();
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [address, isConnected, token, vault],
  );

  return { deposit, isLoading, buttonMessage, error };
};
