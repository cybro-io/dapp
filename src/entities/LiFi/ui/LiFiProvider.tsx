'use client';

import React from 'react';

import EthereumProvider from '@walletconnect/ethereum-provider';
import {
  useSwitchNetwork,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { Address, createWalletClient, custom, Chain } from 'viem';
import { arbitrum, blast, bsc, mainnet, optimism, polygon } from 'viem/chains';

import { evmProvider } from '@/entities/LiFi';
import { useWeb3ModalAccount } from '@/shared/lib';

const chains = [arbitrum, mainnet, optimism, polygon, blast, bsc];

const getChain = (chainId: number) =>
  chains.find((chain) => (chain as Chain).id === chainId) as Chain;

export const LiFiProvider = ({ children }: React.PropsWithChildren) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();

  React.useEffect(() => {
    if (!walletProvider || !address) return;

    const client = createWalletClient({
      account: address as Address,
      chain: getChain(chainId),
      transport: custom(walletProvider as EthereumProvider),
    });

    evmProvider.setOptions({
      getWalletClient: async () => client,
      switchChain: async (switchChainId) => {
        const chain = getChain(switchChainId);
        if (chain) {
          await client.switchChain(chain);
        }

        return createWalletClient({
          account: address as Address,
          chain,
          transport: custom(walletProvider as EthereumProvider),
        });
      },
    });
  }, [walletProvider, address, chainId]);

  return <React.Fragment>{children}</React.Fragment>;
};
