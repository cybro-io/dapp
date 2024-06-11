'use client';

import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers, BrowserProvider } from 'ethers';

import USDB from '@/app/abi/usdb.json';
import USDB_VAULT from '@/app/abi/usdbVault.json';
import WBTC from '@/app/abi/wbtc.json';
import WBTC_VAULT from '@/app/abi/wbtcVault.json';
import WETH from '@/app/abi/weth.json';
import WETH_VAULT from '@/app/abi/wethVault.json';
import { Nullable } from '@/shared/types';

interface EthersContextProps {
  provider: Nullable<ethers.Provider>;
  signer: Nullable<ethers.Signer>;
  usdbContract: Nullable<ethers.Contract>;
  wethContract: Nullable<ethers.Contract>;
  wbtcContract: Nullable<ethers.Contract>;
  usdbVaultContract: Nullable<ethers.Contract>;
  wethVaultContract: Nullable<ethers.Contract>;
  wbtcVaultContract: Nullable<ethers.Contract>;
}

const EthersContext = React.createContext<EthersContextProps | undefined>(undefined);

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const [provider, setProvider] = React.useState<Nullable<ethers.Provider>>(null);
  const [signer, setSigner] = React.useState<Nullable<ethers.Signer>>(null);
  const [usdbContract, setUsdbContract] = React.useState<Nullable<ethers.Contract>>(null);
  const [wethContract, setWethContract] = React.useState<Nullable<ethers.Contract>>(null);
  const [wbtcContract, setWbtcContract] = React.useState<Nullable<ethers.Contract>>(null);
  const [usdbVaultContract, setUsdbVaultContract] = React.useState<Nullable<ethers.Contract>>(null);
  const [wethVaultContract, setWethVaultContract] = React.useState<Nullable<ethers.Contract>>(null);
  const [wbtcVaultContract, setWbtcVaultContract] = React.useState<Nullable<ethers.Contract>>(null);

  React.useEffect(() => {
    const getValues = async () => {
      if (isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const usdbContract = new ethers.Contract(USDB.address, USDB.abi, signer);
        const wethContract = new ethers.Contract(WETH.address, WETH.abi, signer);
        const wbtcContract = new ethers.Contract(WBTC.address, WBTC.abi, signer);
        const usdbVaultContract = new ethers.Contract(USDB_VAULT.address, USDB_VAULT.abi, signer);
        const wethVaultContract = new ethers.Contract(WETH_VAULT.address, WETH_VAULT.abi, signer);
        const wbtcVaultContract = new ethers.Contract(WBTC_VAULT.address, WBTC_VAULT.abi, signer);

        setSigner(signer);
        setProvider(ethersProvider);
        setUsdbContract(usdbContract);
        setWethContract(wethContract);
        setWbtcContract(wbtcContract);
        setUsdbVaultContract(usdbVaultContract);
        setWethVaultContract(wethVaultContract);
        setWbtcVaultContract(wbtcVaultContract);
      }
    };

    getValues();
  }, [isConnected, walletProvider]);

  const contextValue = React.useMemo(
    () => ({
      provider,
      signer,
      usdbContract,
      wethContract,
      wbtcContract,
      usdbVaultContract,
      wethVaultContract,
      wbtcVaultContract,
    }),
    [
      usdbContract,
      wethContract,
      wbtcContract,
      usdbVaultContract,
      wethVaultContract,
      wbtcVaultContract,
      provider,
      signer,
    ],
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
