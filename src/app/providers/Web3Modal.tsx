'use client';

import React from 'react';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

import { Chain } from '@/shared/const';

type Web3ModalProps = {
  children: React.ReactNode;
};

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID as string;
const anrkId = process.env.NEXT_PUBLIC_ANKR_ID as string;

const chains = [
  {
    chainId: Chain.BlastTest,
    name: 'Blast Testnet',
    currency: 'ETH',
    explorerUrl: 'https://testnet.blastscan.io',
    rpcUrl: `https://rpc.ankr.com/blast_testnet_sepolia/${anrkId}`,
  },
];

const metadata = {
  name: 'CYBRO',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  url: 'http://localhost:3000',
  icons: ['https://avatars.mywebsite.com/'],
};

const ethersConfig = defaultConfig({
  metadata,
});

createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  defaultChain: chains[0],
  enableAnalytics: true,
  enableOnramp: true,
});

export const Web3Modal: React.FC<Web3ModalProps> = ({ children }) => {
  return children;
};
