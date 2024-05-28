'use client';

import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers, BrowserProvider } from 'ethers';

import ERC20 from '@/app/abi/erc20.json';
import { Nullable } from '@/shared/types';

interface EthersContextProps {
  provider: Nullable<ethers.Provider>;
  signer: Nullable<ethers.Signer>;
  erc20Contract: Nullable<ethers.Contract>;
}

const EthersContext = React.createContext<EthersContextProps | undefined>(undefined);

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const [provider, setProvider] = React.useState<Nullable<ethers.Provider>>(null);
  const [signer, setSigner] = React.useState<Nullable<ethers.Signer>>(null);
  const [erc20Contract, setErc20Contract] = React.useState<Nullable<ethers.Contract>>(null);

  React.useEffect(() => {
    const getValues = async () => {
      if (isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const erc20Contract = new ethers.Contract(ERC20.address, ERC20.abi, signer);
        setSigner(signer);
        setProvider(ethersProvider);
        setErc20Contract(erc20Contract);
      }
    };

    getValues();
  }, [isConnected, walletProvider]);

  const contextValue = React.useMemo(
    () => ({ provider, signer, erc20Contract }),
    [erc20Contract, provider, signer],
  );

  return <EthersContext.Provider value={contextValue}>{children}</EthersContext.Provider>;
};

export const useEthers = (): EthersContextProps => {
  const context = React.useContext(EthersContext);
  if (!context) {
    throw new Error('useEthers must be used within an EthersProvider');
  }
  return context;
};
