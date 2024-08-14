import { createStore } from 'effector';
import { useUnit } from 'effector-react';
import { ethers } from 'ethers';
import { isTronToken, Symbiosis, Token } from 'symbiosis-js-sdk';

import TOKEN from '@/app/abi/token.json';
import { fromWei } from '@/shared/utils';

export const TYPE_SYMBIOSIS = 'mainnet'; //process.env.NEXT_PUBLIC_TYPE as ConfigName;
const clientId = 'cybro-dapp';

export const $symbiosis = createStore<Symbiosis>(new Symbiosis(TYPE_SYMBIOSIS, clientId));

export const getAvailableBalance = async (
  token: Token,
  provider: ethers.providers.StaticJsonRpcProvider,
  walletAddress: string,
) => {
  try {
    // todo: add support in v1.1
    if (isTronToken(token)) {
      throw new Error('Tron is not supported');
    }

    // Native token
    if (token.isNative) {
      const balance = fromWei(await provider.getBalance(walletAddress, 'latest'), token.decimals);
      return String(balance);
    }

    const contract = new ethers.Contract(token.address, TOKEN, provider);
    const balance = fromWei(await contract.balanceOf(walletAddress), token.decimals);

    return String(balance);
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const useSymbiosis = () => {
  return useUnit($symbiosis);
};
