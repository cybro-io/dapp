import React from 'react';

import { useEthers } from '@/app/providers';
import { Money } from '@/shared/types';
import { formatEth, parseMoney } from '@/shared/utils';

export type Balance = {
  ethBalance: Money;
  usdbBalance: Money;
  wethBalance: Money;
  wbtcBalance: Money;
};

export const useBalances = (): Balance => {
  const { provider, signer, usdbContract, wethContract, wbtcContract } = useEthers();
  const [ethBalance, setEthBalance] = React.useState<Money>(null);
  const [usdbBalance, setUsdbBalance] = React.useState<Money>(null);
  const [wethBalance, setWethBalance] = React.useState<Money>(null);
  const [wbtcBalance, setWbtcBalance] = React.useState<Money>(null);

  React.useEffect(() => {
    const fetchBalances = async () => {
      if (provider && signer && usdbContract && wethContract && wbtcContract) {
        const address = await signer.getAddress();
        const ethBalance = await provider.getBalance(address);
        setEthBalance(formatEth(ethBalance));

        const usdbBalance = await usdbContract.balanceOf(address);
        setUsdbBalance(parseMoney(usdbBalance));

        const wethBalance = await wethContract.balanceOf(address);
        setWethBalance(parseMoney(wethBalance));

        const wbtcBalance = await wbtcContract.balanceOf(address);
        setWbtcBalance(parseMoney(wbtcBalance, 8));
      }
    };

    fetchBalances();
  }, [usdbContract, provider, signer, wethContract, wbtcContract]);

  return { ethBalance, usdbBalance, wethBalance, wbtcBalance };
};
