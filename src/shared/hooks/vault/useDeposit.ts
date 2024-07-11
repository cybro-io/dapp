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
import { formatUserMoney, increaseGasLimit, VaultCurrency } from '@/shared/utils';

type UseDeposit = {
  deposit: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
};

export const useDeposit = (
  currency: VaultCurrency,
  vaultContract: Nullable<Vault>,
  tokenContract: Nullable<Token>,
  vaultId: number,
): UseDeposit => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { tokens, signer, provider } = useEthers();
  const { mutate } = useAddVaultActionApiV1VaultsVaultIdActionPost();

  const deposit = React.useCallback(
    async (amount: string) => {
      const vaultAddress = vaultContract?.target;

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

        const depositEstimatedGas = await vaultContract.deposit.estimateGas(weiAmount, address);
        const gasLimit = increaseGasLimit(depositEstimatedGas, 1.2);

        const depositTx = await vaultContract.deposit(weiAmount, address, { gasLimit });
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
