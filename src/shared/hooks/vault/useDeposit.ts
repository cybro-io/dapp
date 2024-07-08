import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { useToast } from '@/shared/hooks';
import { Nullable, useAddVaultActionApiV1VaultsVaultIdActionPost, Vault } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney, VaultCurrency } from '@/shared/utils';

type UseDeposit = {
  deposit: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
};

export const useDeposit = (
  currency: VaultCurrency,
  vaultContract: Nullable<Vault>,
  vaultId: number,
): UseDeposit => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { tokens } = useEthers();
  const { mutate } = useAddVaultActionApiV1VaultsVaultIdActionPost();

  const deposit = React.useCallback(
    async (amount: string) => {
      const vaultAddress = vaultContract?.target;
      const tokenContract = vaultAddress ? tokens[vaultAddress as string] : undefined;

      if (!tokenContract || !vaultAddress || !vaultContract || !isConnected || !address) {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
        return;
      }

      try {
        setIsLoading(true);
        const decimals = await tokenContract.decimals();
        const weiAmount = ethers.parseUnits(amount, decimals);

        const approveTx = await tokenContract.approve(vaultAddress, weiAmount);
        setButtonMessage('Approving...');
        await approveTx.wait();

        const depositTx = await vaultContract.deposit(weiAmount, address);
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
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [vaultContract, isConnected, address, triggerToast, tokens, mutate, vaultId, currency],
  );

  return { deposit, isLoading, buttonMessage };
};
