import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

import { QueryKey } from '@/shared/const';
import {
  Maybe,
  Money,
  Nullable,
  useGetPriceApiV1MarketDataPriceGet,
  Vault,
  VaultMin,
} from '@/shared/types';
import { convertToUsd, fromWei, VaultCurrency } from '@/shared/utils';

type UseWithdrawCalculator = {
  yourWithdraw: Money;
  yourWithdrawUsd: Money;
  currentRate: Money;
  timer: string;
};

export const useWithdrawCalculator = (
  vaultContract: Nullable<Vault | VaultMin>,
  amountToWithdraw: Maybe<string> = '0',
  token: VaultCurrency,
  chainId: number,
): UseWithdrawCalculator => {
  const { data } = useGetPriceApiV1MarketDataPriceGet(
    {
      token,
      chain_id: chainId,
    },
    { query: { queryKey: [QueryKey.TokenPrice, token, chainId] } },
  );

  const tokenPrice = Number(data?.data?.data?.price);
  const { address } = useWeb3ModalAccount();
  const [yourWithdraw, setYourWithdraw] = React.useState<Money>(0.0);
  const [yourWithdrawUsd, setYourWithdrawUsd] = React.useState<Money>(0.0);
  const [currentRate, setCurrentRate] = React.useState<Money>(0.0);
  const [timer, setTimer] = React.useState<string>('00:00');

  const fetchData = React.useCallback(async () => {
    if (!address || !vaultContract) {
      return;
    }

    const sharePrice = await vaultContract.sharePrice();
    const decimals = Number(await vaultContract.decimals());

    const weiAmountToWithdraw = ethers.parseUnits(amountToWithdraw, decimals);
    const weiYourWithdraw = (weiAmountToWithdraw * sharePrice) / BigInt(10 ** decimals);

    const yourWithdrawTokens = fromWei(weiYourWithdraw, decimals);
    const yourWithdrawUsd = convertToUsd(yourWithdrawTokens, tokenPrice);

    const currentRate = fromWei(sharePrice, decimals);

    setYourWithdraw(yourWithdrawTokens);
    setYourWithdrawUsd(yourWithdrawUsd);
    setCurrentRate(currentRate);
  }, [address, amountToWithdraw, tokenPrice, vaultContract]);

  React.useEffect(() => {
    fetchData();

    if (!amountToWithdraw || amountToWithdraw === '0') {
      setTimer('00:00');
      return;
    }

    let countdown = 15;

    const updateTimer = () => {
      if (countdown <= 0) {
        fetchData();
        countdown = 15;
      } else {
        countdown -= 1;
      }
      setTimer(`00:${countdown < 10 ? '0' : ''}${countdown}`);
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [amountToWithdraw, fetchData]);

  return {
    yourWithdraw,
    yourWithdrawUsd,
    currentRate,
    timer,
  };
};
