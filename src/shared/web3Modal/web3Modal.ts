'use client';

import React from 'react';

import { Chain } from '@ethereumjs/common';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

type Web3ModalProps = {
  children: React.ReactNode;
};

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID as string;

const chains = [
  {
    chainId: Chain.Mainnet,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://ethereum-rpc.publicnode.com',
  },
  {
    chainId: Chain.Goerli,
    name: 'Goerli',
    currency: 'ETH',
    explorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://eth-goerli.public.blastapi.io',
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
  enableAnalytics: true,
  enableOnramp: true,
});

export const Web3Modal: React.FC<Web3ModalProps> = ({ children }) => {
  return children;
};
