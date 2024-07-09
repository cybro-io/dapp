'use client';

import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { ethers, BrowserProvider } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import { Maybe, Nullable, Token, Vault } from '@/shared/types';

interface EthersContextProps {
  provider: Nullable<ethers.Provider>;
  signer: Nullable<ethers.Signer>;
  vaults: { [address: string]: Maybe<Vault> };
  tokens: { [vaultAddress: string]: Maybe<Token> };
  createVaultInstance: (vaultAddress: string, abi: any) => Promise<{ vault: Vault; token: Token }>;
  createTokenInstance: (tokenAddress: string) => Token;
}

const EthersContext = React.createContext<EthersContextProps | undefined>(undefined);

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();
  const [provider, setProvider] = React.useState<Nullable<ethers.Provider>>(null);
  const [signer, setSigner] = React.useState<Nullable<ethers.Signer>>(null);
  const [vaults, setVaults] = React.useState<{ [address: string]: Vault }>({});
  const [tokens, setTokens] = React.useState<{ [vaultAddress: string]: Token }>({});

  React.useEffect(() => {
    const getValues = async () => {
      if (isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();

        setSigner(signer);
        setProvider(ethersProvider);
      }
    };

    getValues();
  }, [isConnected, walletProvider]);

  const createVaultInstance = React.useCallback(
    async (vaultAddress: string, abi: any) => {
      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }

      if (!provider || !signer) {
        throw new Error('Provider or signer not initialized');
      }

      if (vaults[vaultAddress] && tokens[vaultAddress]) {
        return { vault: vaults[vaultAddress], token: tokens[vaultAddress] };
      }

      const vaultInstance = new ethers.Contract(vaultAddress, abi, signer) as unknown as Vault;

      const tokenAddress = await vaultInstance.asset();
      const tokenInstance = new ethers.Contract(tokenAddress, TOKEN, signer) as unknown as Token;

      setVaults(prevContracts => ({
        ...prevContracts,
        [vaultAddress]: vaultInstance,
      }));

      setTokens(prevTokens => ({
        ...prevTokens,
        [tokenAddress]: tokenInstance,
      }));

      return { vault: vaultInstance, token: tokenInstance };
    },
    [isConnected, provider, signer, vaults, tokens],
  );

  const createTokenInstance = React.useCallback(
    (tokenAddress: string) => {
      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }

      if (!provider || !signer) {
        throw new Error('Provider or signer not initialized');
      }

      if (tokens[tokenAddress]) {
        return tokens[tokenAddress];
      }

      const tokenInstance = new ethers.Contract(tokenAddress, TOKEN, signer) as unknown as Token;
      setTokens(prevContracts => ({
        ...prevContracts,
        [tokenAddress]: tokenInstance,
      }));

      return tokenInstance;
    },
    [isConnected, provider, signer, tokens],
  );

  const contextValue = React.useMemo(
    () => ({
      provider,
      signer,
      vaults,
      tokens,
      createVaultInstance,
      createTokenInstance,
    }),
    [provider, signer, vaults, tokens, createVaultInstance, createTokenInstance],
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
