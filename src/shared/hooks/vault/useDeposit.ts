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

export const useDeposit = (currency: VaultCurrency, contract: Nullable<Vault>): UseDeposit => {
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

  const deposit = React.useCallback(
    async (amount: string) => {
      if (!token || !contract || !isConnected || !address) {
        setError('Props error');
        return;
      }

      try {
        setIsLoading(true);
        const vaultAddress = contract.target;
        const decimals = await token.decimals();
        const weiAmount = ethers.parseUnits(amount, decimals);

        const approveTx = await token.approve(vaultAddress, weiAmount);
        setButtonMessage('Approving...');
        await approveTx.wait();

        const depositTx = await contract.deposit(weiAmount, address);
        setButtonMessage('Depositing...');
        await depositTx.wait();
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [address, contract, isConnected, token],
  );

  return { deposit, isLoading, buttonMessage, error };
};
