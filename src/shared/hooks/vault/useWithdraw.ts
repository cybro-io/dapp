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

type UseWithdraw = {
  withdraw: (amount: string) => Promise<void>;
  isLoading: boolean;
  buttonMessage: string | null;
};

export const useWithdraw = (
  currency: VaultCurrency,
  contract: Nullable<Vault>,
  vaultId: number,
): UseWithdraw => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { mutate, isPending, error } = useAddVaultActionApiV1VaultsVaultIdActionPost();

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
        const decimals = await token.decimals();
        const weiAmount = ethers.parseUnits(amount, decimals);

        const withdrawTx = await contract.redeem(weiAmount, address, address);
        setButtonMessage('Redeeming...');
        await withdrawTx.wait();

        mutate({ vaultId, data: { tx_hash: withdrawTx.hash, address, action: 'withdraw' } });

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
    [token, contract, isConnected, address, mutate, vaultId, triggerToast, currency],
  );

  return { withdraw, isLoading, buttonMessage };
};
