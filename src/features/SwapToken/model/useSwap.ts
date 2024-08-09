import NiceModal from '@ebay/nice-modal-react';
import { MaxUint256 } from '@ethersproject/constants';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react/compat';
import { ethers } from 'ethers';
import { GAS_TOKEN, Token, getChainById } from 'symbiosis-js-sdk';

import TOKEN from '@/app/abi/token.json';
import { SuccessSwapModal } from '@/features/SwapToken/ui/SuccessSwapModal';
import { WaitForCompleteModal } from '@/features/SwapToken/ui/WaitForCompleteModal';
import { $symbiosis } from '@/shared/lib';

import { SwapCalculateResult } from './useSwapCalculate';
import { createSwapTransaction } from '@/features/SwapToken/model/useSwapCreateTransaction';

export enum SwapStatus {
  APPROVE_TRANSACTION,
  SEND_TRANSACTION,
  MINED_TRANSACTION,
  COMPLETED_TRANSACTION,
}

export const getSwapStatus = (status: SwapStatus, tokenIn: Token, tokenOut: Token) => {
  const statuses: Record<SwapStatus, string> = {
    [SwapStatus.APPROVE_TRANSACTION]: 'Approving the transaction...',
    [SwapStatus.SEND_TRANSACTION]: `Sending the transaction to ${tokenIn.chain?.name}...`,
    [SwapStatus.MINED_TRANSACTION]: 'Waiting for the transaction to be mined...',
    [SwapStatus.COMPLETED_TRANSACTION]: `Getting ${tokenOut.symbol} on ${tokenOut.chain?.name}...`,
  };

  return statuses[status];
};

type SwapInfo = SwapCalculateResult & { swapStatus: SwapStatus | null };

const $swapInfo = createStore<SwapInfo | null>(null);
const setSwapInfo = createEvent<SwapInfo>();
const setSwapStatus = createEvent<SwapInfo['swapStatus']>();

sample({
  clock: setSwapInfo,
  target: $swapInfo,
});

$swapInfo.on(setSwapStatus, (swapInfo, swapStatus) =>
  swapInfo ? { ...swapInfo, swapStatus } : swapInfo,
);

interface SwapEvent {
  walletProvider: ethers.providers.ExternalProvider;
  calculate: SwapCalculateResult;
}

const swap = createEvent<SwapEvent>();

const swapFx = createEffect<SwapEvent, void, void>(async ({ walletProvider, calculate }) => {
  try {
    const { transactionRequest, tokenAmountIn, tokenAmountOut, approveTo, from, type, swapping } =
      calculate;
    setSwapInfo({ ...calculate, swapStatus: null });

    NiceModal.show(WaitForCompleteModal);

    const symbiosis = $symbiosis.getState();

    if (!walletProvider) {
      throw new Error('Wallet not connected');
    }

    const ethProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethProvider.getSigner(from);

    if (type !== 'evm' || typeof transactionRequest.chainId !== 'number') {
      throw new Error('Unsupported transaction type');
    }

    const chainConfig = symbiosis.chainConfig(transactionRequest.chainId);
    const chain = getChainById(transactionRequest.chainId);

    if (!chain) {
      throw new Error('Unsupported chain');
    }

    const params = {
      chainName: chain.name,
      chainId: `0x${chainConfig.id.toString(16)}`,
      rpcUrls: [chainConfig.rpc],
      nativeCurrency: GAS_TOKEN[chain.id],
      blockExplorerUrls: [chain.explorer],
    };

    await ethProvider.send('wallet_addEthereumChain', [params]);

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
    const receipt = await transactionResponse.wait(1);
    setSwapStatus(SwapStatus.MINED_TRANSACTION);

    // Wait for transaction to be completed on recipient chain
    await swapping.waitForComplete(receipt);
    setSwapStatus(SwapStatus.COMPLETED_TRANSACTION);

    createSwapTransaction({
      address: from,
      symbiosisData: {
        chain_id: transactionRequest.chainId,
        transaction_hash: receipt.transactionHash,
      },
    });

    NiceModal.show(SuccessSwapModal, {
      sentSymbol: tokenAmountIn.token.symbol,
      sentAmount: tokenAmountIn.toSignificant(),
      receivedSymbol: tokenAmountOut.token.symbol,
      receivedAmount: tokenAmountOut.toSignificant(),
    }).then();
  } catch (error) {
    // When changed network
    const err = error as { message?: string };
    if (String(err?.message).includes('underlying network changed')) {
      swap({ walletProvider, calculate });
      return;
    } else {
    }
    console.log('Swap error', error);
  }
});

sample({
  clock: swap,
  target: swapFx,
});

export const useSwap = () => {
  return useUnit({ swap, isLoadingSwap: swapFx.pending, swapInfo: $swapInfo });
};
