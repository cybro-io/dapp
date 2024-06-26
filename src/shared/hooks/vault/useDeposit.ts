import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { useToast } from '@/shared/hooks';
import {
  Nullable,
  Token,
  useAddVaultActionApiV1VaultsVaultIdActionPost,
  Vault,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney, VaultCurrency } from '@/shared/utils';

type UseDeposit = {
  deposit: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
};

export const useDeposit = (
  currency: VaultCurrency,
  contract: Nullable<Vault>,
  vaultId: number,
): UseDeposit => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { usdbContract, wethContract, wbtcContract } = useEthers();

  const { mutate, isPending, error } = useAddVaultActionApiV1VaultsVaultIdActionPost();

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
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect support.',
          type: ToastType.Error,
        });
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

        mutate({ vaultId, data: { tx_hash: depositTx.hash, address, action: 'deposit' } });

        triggerToast({
          message: `${formatUserMoney(amount)} ${currency} deposited`,
          description: 'Check your updated Vault Balance or explore the contract.',
        });
      } catch (error: any) {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect support.',
          type: ToastType.Error,
        });
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [token, contract, isConnected, address, mutate, vaultId, triggerToast, currency],
  );

  return { deposit, isLoading, buttonMessage };
};
