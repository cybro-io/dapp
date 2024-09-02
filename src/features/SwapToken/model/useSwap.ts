import NiceModal from '@ebay/nice-modal-react';
import { MaxUint256 } from '@ethersproject/constants';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react/compat';
import { ethers } from 'ethers';
import { GAS_TOKEN, getChainById } from 'symbiosis-js-sdk';

import TOKEN from '@/app/abi/token.json';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { $symbiosis } from '@/shared/lib';

import { SwapStatus } from '../helpers/getSwapStatus';
import { WaitForCompleteModal } from '../ui/WaitForCompleteModal';

import { SwapCalculateResult } from './useSwapCalculate';

type SwapInfo = SwapCalculateResult & { swapStatus: SwapStatus | null };

const $swapInfo = createStore<SwapInfo | null>(null);
const setSwapInfo = createEvent<SwapInfo>();
const setSwapStatus = createEvent<SwapInfo['swapStatus']>();
const swap = createEvent<SwapEvent>();

interface SwapEvent {
  walletProvider: ethers.providers.ExternalProvider;
  calculate: SwapCalculateResult;
}

const swapFx = createEffect<SwapEvent, void, void>(async ({ walletProvider, calculate }) => {
  try {
    const { transactionRequest, tokenAmountIn, approveTo, from, transactionType, kind } = calculate;

    setSwapInfo({ ...calculate, swapStatus: null });

    NiceModal.show(WaitForCompleteModal);

    const symbiosis = $symbiosis.getState();

    if (!walletProvider) {
      throw new Error('Wallet not connected');
    }

    const provider = new ethers.providers.Web3Provider(walletProvider);
    const signer = provider.getSigner(from);

    if (transactionType !== 'evm') {
      throw new Error('Unsupported transaction type');
    }

    if (!('chainId' in transactionRequest) || typeof transactionRequest.chainId !== 'number') {
      throw new Error("Don't found chain");
    }

    const chainConfig = symbiosis.chainConfig(transactionRequest.chainId);
    const chain = getChainById(transactionRequest.chainId);

    if (!chain) {
      throw new Error('Unsupported chain');
    }

    const hexChain = `0x${chainConfig.id.toString(16)}`;
    const params = {
      chainName: chain.name,
      chainId: hexChain,
      rpcUrls: [chainConfig.rpc],
      nativeCurrency: {
        decimals: GAS_TOKEN[chain.id].decimals,
        name: GAS_TOKEN[chain.id].name,
        symbol: GAS_TOKEN[chain.id].symbol,
      },
      blockExplorerUrls: [chain.explorer],
    };

    await provider
      .send('wallet_switchEthereumChain', [{ chainId: hexChain }])
      .catch(() => provider.send('wallet_addEthereumChain', [params]));

    // Approve token
    if (!tokenAmountIn.token.isNative) {
      const tokenContract = new ethers.Contract(tokenAmountIn.token.address, TOKEN, signer);
      const approveResponse = await tokenContract.approve(approveTo, MaxUint256);

      await approveResponse.wait(1);
      setSwapStatus(SwapStatus.APPROVE_TRANSACTION);
    }

    // Send transaction to chain
    const transactionResponse = await signer.sendTransaction(transactionRequest);
    setSwapStatus(SwapStatus.SEND_TRANSACTION);

    // Wait for transaction to be mined
    const receipt = await transactionResponse.wait(12);
    setSwapStatus(SwapStatus.MINED_TRANSACTION);

    console.log('receipt:', receipt);

    // Wait for transaction to be completed on recipient chain
    if (kind === 'onchain-swap') {
      await provider.waitForTransaction(receipt.transactionHash);
    } else {
      await symbiosis.waitForComplete({
        chainId: transactionRequest.chainId,
        txId: transactionResponse.hash,
      });
    }

    setSwapStatus(SwapStatus.COMPLETED_TRANSACTION);

    Mixpanel.track(MixpanelEvent.SuccessSwap);

    NiceModal.remove(WaitForCompleteModal);
  } catch (error) {
    console.log(error);

    const normalizeError = error as Error;

    if (String(normalizeError.message).includes('underlying network changed')) {
      swap({ walletProvider, calculate });
      return;
    }
  }
});

sample({
  clock: setSwapInfo,
  target: $swapInfo,
});

$swapInfo.on(setSwapStatus, (swapInfo, swapStatus) =>
  swapInfo ? { ...swapInfo, swapStatus } : swapInfo,
);

sample({
  clock: swap,
  target: swapFx,
});

export const useSwap = () => {
  const units = useUnit({ swap, isLoadingSwap: swapFx.pending, swapInfo: $swapInfo });

  const subscribeSuccessSwap = (watcher?: (params: SwapEvent['calculate']) => void) =>
    swapFx.done.watch(({ params }) => watcher?.(params.calculate));

  return { ...units, subscribeSuccessSwap };
};
