import React from 'react';

import { useWeb3ModalAccount } from '@/shared/lib';
import { utils } from 'ethers';

import { useEthers } from '@/app/providers';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { useToast } from '@/shared/hooks';
import {
  Nullable,
  Token,
  useAddVaultActionApiV1VaultsVaultIdActionPost,
  Vault,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney, increaseGasLimit, VaultCurrency } from '@/shared/utils';

type UseWithdraw = {
  withdraw: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
};

export const useWithdraw = (
  currency: VaultCurrency,
  vaultContract: Nullable<Vault>,
  tokenContract: Nullable<Token>,
  vaultId: number,
): UseWithdraw => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();
  const { mutate } = useAddVaultActionApiV1VaultsVaultIdActionPost();
  const { tokens } = useEthers();

  const withdraw = React.useCallback(
    async (amount: string) => {
      const vaultAddress = vaultContract?.address;
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
        const weiAmount = utils.parseUnits(amount, decimals);

        const withdrawEstimatedGas = await vaultContract.estimateGas.redeem(
          weiAmount,
          address,
          address,
        );
        const gasLimit = increaseGasLimit(withdrawEstimatedGas, 1.2);

        const withdrawTx = await vaultContract.redeem(weiAmount, address, address, { gasLimit });
        setButtonMessage('Redeeming...');
        await withdrawTx.wait();

        mutate({ vaultId, data: { tx_hash: withdrawTx.hash, address, action: 'withdraw' } });
        Mixpanel.track(MixpanelEvent.WithdrawalSuccess);

        triggerToast({
          message: `${formatUserMoney(amount)} ${currency} withdrawn`,
          description: 'Check the balance of the wallet connected to the platform.',
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
    [vaultContract, tokenContract, isConnected, address, triggerToast, mutate, vaultId, currency],
  );

  return { withdraw, isLoading, buttonMessage };
};
