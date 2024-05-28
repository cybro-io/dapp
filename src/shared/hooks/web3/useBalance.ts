import React from 'react';

import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Nullable } from '@/shared/types';

export type Balance = {
  ethBalance: Nullable<string>;
  erc20Balance: Nullable<string>;
};

export const useBalances = () => {
  const { provider, signer, erc20Contract } = useEthers();
  const [ethBalance, setEthBalance] = React.useState<Nullable<string>>(null);
  const [erc20Balance, setErc20Balance] = React.useState<Nullable<string>>(null);

  React.useEffect(() => {
    const fetchBalances = async () => {
      if (provider && signer && erc20Contract) {
        const address = await signer.getAddress();
        const ethBalance = await provider.getBalance(address);
        setEthBalance(ethers.formatEther(ethBalance));

        const erc20Balance = await erc20Contract.balanceOf(address);
        setErc20Balance(ethers.formatUnits(erc20Balance, 18));
      }
    };

    fetchBalances();
  }, [erc20Contract, provider, signer]);

  return { ethBalance, erc20Balance };
};
