import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Nullable, Token, Vault } from '@/shared/types';
import { VaultCurrency } from '@/shared/utils';

type UseDeposit = {
  deposit: (event: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
  error: Nullable<string>;
};

export const useDeposit = (vaultType: VaultCurrency): UseDeposit => {
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

  let token: Nullable<Token>;
  let vault: Nullable<Vault>;

  switch (vaultType) {
    case VaultCurrency.USDB:
      token = usdbContract;
      vault = usdbVaultContract;
      break;
    case VaultCurrency.WETH:
      token = wethContract;
      vault = wethVaultContract;
      break;
    case VaultCurrency.WBTC:
      token = wbtcContract;
      vault = wbtcVaultContract;
      break;
  }

  const deposit = React.useCallback(
    async (amount: string) => {
      if (!token || !vault || !isConnected || !address) {
        setError('Error');
        return;
      }

      try {
        setIsLoading(true);
        const vaultAddress = vault.target;
        const decimals = await token.decimals();
        const weiAmount = ethers.parseUnits(amount, decimals);

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
