import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Nullable, Token, Vault } from '@/shared/types';
import { VaultCurrency } from '@/shared/utils';

type UseWithdraw = {
  withdraw: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
  error: Nullable<string>;
};

export const useWithdraw = (currency: VaultCurrency, contract: Nullable<Vault>): UseWithdraw => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { usdbContract, wethContract, wbtcContract } = useEthers();

  let token: Nullable<Token>;

  switch (currency) {
    case VaultCurrency.USDB:
      token = usdbContract;
      break;
    case VaultCurrency.WETH:
      token = wethContract;
      break;
    case VaultCurrency.WBTC:
      token = wbtcContract;
      break;
  }

  const withdraw = React.useCallback(
    async (amount: string) => {
      if (!token || !contract || !isConnected || !address) {
        setError('Missing contract or not connected');
        return;
      }

      try {
        setIsLoading(true);
        const decimals = await token.decimals();
        const sharePrice = await contract.sharePrice();
        const weiAmount = ethers.parseUnits(amount, decimals);

        const sharesAmount = (weiAmount * 10n ** BigInt(decimals)) / sharePrice;

        const withdrawTx = await contract.redeem(sharesAmount, address, address);
        setButtonMessage('Redeeming...');
        await withdrawTx.wait();
      } catch (error: any) {
        setError(error.message || error.toString());
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [address, isConnected, token, contract],
  );

  return { withdraw, isLoading, buttonMessage, error };
};
