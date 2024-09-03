import React from 'react';

import {
  useSwitchNetwork,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { ethers, utils } from 'ethers';

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

export const useDeposit = (
  currency: VaultCurrency,
  vaultContract: Nullable<Vault>,
  tokenContract: Nullable<Token>,
  vaultId: number,
  chainId: number,
) => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { tokens, signer, provider } = useEthers();
  const { mutate } = useAddVaultActionApiV1VaultsVaultIdActionPost();
  const { switchNetwork } = useSwitchNetwork();
  const { walletProvider } = useWeb3ModalProvider();

  const deposit = React.useCallback(
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

        if (!walletProvider) {
          throw new Error('Wallet provider is not available');
        }

        await switchNetwork(chainId);

        const decimals = await tokenContract.decimals();
        const weiAmount = utils.parseUnits(amount, decimals);

        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();

        const token = new ethers.Contract(tokenContract.address, tokenContract.interface, signer);

        const vault = new ethers.Contract(vaultAddress, vaultContract.interface, signer);

        const approveTx = await token.approve(vaultAddress, weiAmount);
        setButtonMessage('Approving...');
        await approveTx.wait();

        const depositEstimatedGas = await vault.estimateGas.deposit(weiAmount, address);
        const gasLimit = increaseGasLimit(depositEstimatedGas, 1.2);

        const depositTx = await vault.deposit(weiAmount, address, { gasLimit });
        setButtonMessage('Depositing...');
        await depositTx.wait();

        mutate({ vaultId, data: { tx_hash: depositTx.hash, address, action: 'deposit' } });
        Mixpanel.track(MixpanelEvent.DepositSuccess);

        triggerToast({
          message: `${formatUserMoney(amount)} ${currency} deposited`,
          description: 'Check your updated Vault Balance or explore the contract.',
        });
      } catch (error: any) {
        console.error('error deposit: ', error);
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
    [vaultContract, tokenContract, isConnected, address, triggerToast, mutate, vaultId, currency],
  );

  return { deposit, isLoading, buttonMessage, setButtonMessage };
};
