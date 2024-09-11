'use client';

import React, { useCallback } from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useInterval } from 'usehooks-ts';

import { useSwapTokens } from '@/entities/SwapToken';
import { useWalletBalances } from '@/entities/WalletBalance';

export const WalletBalancesProvider = ({ children }: React.PropsWithChildren) => {
  const { address } = useWeb3ModalAccount();
  const { tokens } = useSwapTokens();
  const { getWalletBalances, isLoadingWalletBalances } = useWalletBalances();

  const handleGetWalletBalances = useCallback(() => {
    if (address && tokens && !isLoadingWalletBalances) getWalletBalances({ address, tokens });
  }, [address, tokens, isLoadingWalletBalances]);

  React.useEffect(() => {
    if (address && !isLoadingWalletBalances) handleGetWalletBalances();
  }, [address]);

  useInterval(handleGetWalletBalances, 60000);

  return <React.Fragment>{children}</React.Fragment>;
};
