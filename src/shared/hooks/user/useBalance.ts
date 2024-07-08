import React from 'react';

import { useEthers } from '@/app/providers';
import { Money, Nullable, Vault } from '@/shared/types';
import { fromWei } from '@/shared/utils';

export type Balance = {
  balance: Money;
};

export const useBalances = (vaultContract: Nullable<Vault>): Balance => {
  const { provider, signer, tokens } = useEthers();
  const [balance, setBalance] = React.useState<Money>(null);

  React.useEffect(() => {
    const fetchBalances = async () => {
      if (provider && signer && vaultContract) {
        const vaultAddress = vaultContract.target as string;
        const tokenContract = tokens[vaultAddress];
        const userAddress = await signer.getAddress();

        if (!tokenContract) {
          throw new Error('Token not found');
        }

        const balance = await tokenContract.balanceOf(userAddress);
        const decimals = await vaultContract.decimals();
        setBalance(fromWei(balance, Number(decimals)));
      }
    };

    fetchBalances();
  }, [provider, signer, tokens, vaultContract]);

  return { balance };
};
