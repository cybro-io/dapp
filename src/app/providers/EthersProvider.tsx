'use client';

import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers, BrowserProvider } from 'ethers';

import VAULT from '@/app/abi/vault.json';
import WBTC from '@/app/abi/wbtc.json';
import WBTC_VAULT from '@/app/abi/wbtcVault.json';
import WETH from '@/app/abi/weth.json';
import WETH_VAULT from '@/app/abi/wethVault.json';
import { Usdb, Wbtc, WbtcVault, Weth, WethVault, Nullable, Vault } from '@/shared/types';

interface EthersContextProps {
  provider: Nullable<ethers.Provider>;
  signer: Nullable<ethers.Signer>;
  usdbContract: Nullable<Usdb>;
  wethContract: Nullable<Weth>;
  wbtcContract: Nullable<Wbtc>;
  wethVaultContract: Nullable<WethVault>;
  wbtcVaultContract: Nullable<WbtcVault>;
  contracts: { [address: string]: Vault };
  createContractInstance: (address: string) => Nullable<Vault>;
}

const EthersContext = React.createContext<EthersContextProps | undefined>(undefined);

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const [provider, setProvider] = React.useState<Nullable<ethers.Provider>>(null);
  const [signer, setSigner] = React.useState<Nullable<ethers.Signer>>(null);
  const [usdbContract, setUsdbContract] = React.useState<Nullable<Usdb>>(null);
  const [wethContract, setWethContract] = React.useState<Nullable<Weth>>(null);
  const [wbtcContract, setWbtcContract] = React.useState<Nullable<Wbtc>>(null);
  const [wethVaultContract, setWethVaultContract] = React.useState<Nullable<WethVault>>(null);
  const [wbtcVaultContract, setWbtcVaultContract] = React.useState<Nullable<WbtcVault>>(null);
  const [contracts, setContracts] = React.useState<{ [address: string]: Vault }>({});

  React.useEffect(() => {
    const getValues = async () => {
      if (isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const wethContract = new ethers.Contract(WETH.address, WETH.abi, signer) as unknown as Weth;
        const wbtcContract = new ethers.Contract(WBTC.address, WBTC.abi, signer) as unknown as Wbtc;
        const wethVaultContract = new ethers.Contract(
          WETH_VAULT.address,
          WETH_VAULT.abi,
          signer,
        ) as unknown as WethVault;
        const wbtcVaultContract = new ethers.Contract(
          WBTC_VAULT.address,
          WBTC_VAULT.abi,
          signer,
        ) as unknown as WbtcVault;

        setSigner(signer);
        setProvider(ethersProvider);
        setUsdbContract(usdbContract);
        setWethContract(wethContract);
        setWbtcContract(wbtcContract);
        setWethVaultContract(wethVaultContract);
        setWbtcVaultContract(wbtcVaultContract);
      }
    };

    getValues();
  }, [isConnected, usdbContract, walletProvider]);

  const createContractInstance = React.useCallback(
    (address: string) => {
      if (!isConnected) {
        return null;
      }

      if (!provider || !signer) {
        throw new Error('Provider or signer not initialized');
      }

      const contractInstance = new ethers.Contract(address, VAULT.abi, signer) as unknown as Vault;
      setContracts(prevContracts => ({
        ...prevContracts,
        [address]: contractInstance,
      }));

      return contractInstance;
    },
    [isConnected, provider, signer],
  );

  const contextValue = React.useMemo(
    () => ({
      provider,
      signer,
      usdbContract,
      wethContract,
      wbtcContract,
      wethVaultContract,
      wbtcVaultContract,
      contracts,
      createContractInstance,
    }),
    [
      provider,
      signer,
      usdbContract,
      wethContract,
      wbtcContract,
      wethVaultContract,
      wbtcVaultContract,
      contracts,
      createContractInstance,
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
