import React from 'react';

import { ethers } from 'ethers';

import { useEthers } from '@/app/providers';
import { Money, Nullable } from '@/shared/types';
import { formatMoney, VaultType } from '@/shared/utils';

export type Vault = {
  userDeposit: Money;
  totalAssets: Money;
  totalSupply: Money;
};

export const useVault = (vaultType?: VaultType | null): Vault => {
  const { provider, signer, usdbVaultContract, wethVaultContract, wbtcVaultContract } = useEthers();
  const [userDeposit, setUserDeposit] = React.useState<Money>(null);
  const [totalAssets, setTotalAssets] = React.useState<Money>(null);
  const [totalSupply, setTotalSupply] = React.useState<Money>(null);

  React.useEffect(() => {
    const fetchVault = async () => {
      let contract: Nullable<ethers.Contract>;
      let decimals = 18;

      switch (vaultType) {
        case VaultType.USDB:
          contract = usdbVaultContract;
          break;
        case VaultType.WETH:
          contract = wethVaultContract;
          break;
        case VaultType.WBTC:
          contract = wbtcVaultContract;
          decimals = 8;
          break;
        default:
          contract = usdbVaultContract;
          break;
      }

      if (provider && signer && contract) {
        const address = await signer.getAddress();

        const userDeposit = await contract.balanceOf(address);
        setUserDeposit(formatMoney(userDeposit, decimals));

        const totalAssets = await contract.totalAssets();
        setTotalAssets(formatMoney(totalAssets, decimals));

        const totalSupply = await contract.totalSupply();
        setTotalSupply(formatMoney(totalSupply, decimals));
      }
    };

    fetchVault();
  }, [vaultType, provider, signer, usdbVaultContract, wethVaultContract, wbtcVaultContract]);

  return { userDeposit, totalAssets, totalSupply };
};
