import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Contract, ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Nullable, Token, Vault } from '@/shared/types';
import { VaultCurrency } from '@/shared/utils';

type UseWithdraw = {
  withdraw: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
  error: Nullable<string>;
};

export const useWithdraw = (vaultType: VaultCurrency): UseWithdraw => {
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

  const withdraw = React.useCallback(
    async (amount: string) => {
      if (!token || !vault || !isConnected || !address) {
        setError('Missing contract or not connected');
        return;
      }

      try {
        setIsLoading(true);
        const decimals = await token.decimals();
        const sharePrice = await vault.sharePrice();
        const weiAmount = ethers.parseUnits(amount, decimals);

        const sharesAmount = ethers.parseUnits((weiAmount / sharePrice).toString());

        const withdrawTx = await vault.redeem(sharesAmount, address, address);
        setButtonMessage('Redeeming...');
        await withdrawTx.wait();
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [address, isConnected, token, vault],
  );

  return { withdraw, isLoading, buttonMessage, error };
};
