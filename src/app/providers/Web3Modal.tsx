'use client';

import React from 'react';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ChainId, GAS_TOKEN } from 'symbiosis-js-sdk';

import { $swapChains } from '@/entities/SwapToken';
import { Chain } from '@/shared/const';
import { $symbiosis } from '@/shared/lib';

type Web3ModalProps = {
  children: React.ReactNode;
};

const projectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID as string;
const anrkId = process.env.NEXT_PUBLIC_ANKR_ID as string;
const type = process.env.NEXT_PUBLIC_TYPE as string;

const testChains = [
  {
    chainId: Chain.BlastTest,
    name: 'Blast Testnet',
    currency: 'ETH',
    explorerUrl: 'https://testnet.blastscan.io',
    rpcUrl: `https://rpc.ankr.com/blast_testnet_sepolia/${anrkId}`,
  },
];

const mainChains = $swapChains.getState().map((chain) => {
  const chainConfig = $symbiosis.getState().chainConfig(chain.id);

  return {
    chainId: chain.id,
    name: chain.name,
    currency: GAS_TOKEN[chain.id].symbol ?? 'Unknown',
    explorerUrl: chain.explorer,
    rpcUrl:
      chain.id === ChainId.BLAST_MAINNET
        ? `https://rpc.ankr.com/blast/${anrkId}`
        : chainConfig.rpc,
  };
});

const metadata = {
  name: 'CYBRO',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  url: 'https://app.cybro.io',
  icons: ['https://avatars.mywebsite.com/'],
};

const chains = type === 'mainnet' ? mainChains : testChains;

const ethersConfig = defaultConfig({
  metadata,
});

export const web3Modal = createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export const Web3Modal: React.FC<Web3ModalProps> = ({ children }) => {
  return children;
};
