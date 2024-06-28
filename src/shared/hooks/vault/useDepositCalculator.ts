import React from 'react';

import { PeriodTab } from '@/entities/DepositCalculator';
import { Maybe, Money, useGetPriceApiV1MarketDataPriceGet } from '@/shared/types';
import { convertToUsd, VaultCurrency } from '@/shared/utils';

type UseDepositCalculator = {
  availableFundsUsd: Money;
  entryAmountUsd: Money;
  apy: number;
  text: string;
  profitTokens: Money;
  profitUsd: Money;
  balanceAfter: Money;
  balanceAfterText: string;
};

export const useDepositCalculator = (
  amountToDeposit: Maybe<string> = '0',
  balance: Money,
  token: VaultCurrency,
  chainId: number,
  period: PeriodTab,
  yearlyApy: number,
): UseDepositCalculator => {
  const { data } = useGetPriceApiV1MarketDataPriceGet({
    token,
    chain_id: chainId,
  });

  const tokenPrice = Number(data?.data?.data?.price);

  const [availableFundsUsd, setAvailableFundsUsd] = React.useState<Money>(0);
  const [entryAmountUsd, setEntryAmountUsd] = React.useState<Money>(0);
  const [apy, setApy] = React.useState<number>(yearlyApy);
  const [text, setText] = React.useState<string>('yearly');
  const [profitTokens, setProfitTokens] = React.useState<Money>(0);
  const [profitUsd, setProfitUsd] = React.useState<Money>(0);
  const [balanceAfter, setBalanceAfter] = React.useState<Money>(0);
  const [balanceAfterText, setBalanceAfterText] = React.useState<string>('1 year');

  React.useEffect(() => {
    const fetchData = async () => {
      if (balance) {
        const availableFundsUsd = convertToUsd(balance, tokenPrice);
        const entryAmountUsd = convertToUsd(Number(amountToDeposit), tokenPrice);

        setAvailableFundsUsd(availableFundsUsd);
        setEntryAmountUsd(entryAmountUsd);
      }
    };

    fetchData();
  }, [amountToDeposit, balance, tokenPrice]);

  const getProfit = React.useCallback(
    (apy: number) => {
      const profitTokens = Number(amountToDeposit) * (apy / 100);
      const profitUsd = convertToUsd(profitTokens, tokenPrice);
      const balanceAfter = Number(amountToDeposit) + profitTokens;

      setBalanceAfter(balanceAfter);
      setProfitUsd(profitUsd);
      setProfitTokens(profitTokens);
    },
    [amountToDeposit, tokenPrice],
  );

  const getYearly = React.useCallback(() => {
    getProfit(yearlyApy);
    setApy(yearlyApy);
    setText('yearly');
    setBalanceAfterText('1 year');
  }, [getProfit, yearlyApy]);

  const getQuarterly = React.useCallback(() => {
    const apy = yearlyApy / 4;
    getProfit(apy);
    setApy(apy);
    setText('quarterly');
    setBalanceAfterText('3 months');
  }, [getProfit, yearlyApy]);

  const getMonthly = React.useCallback(() => {
    const apy = yearlyApy / 12;
    getProfit(apy);
    setApy(apy);
    setText('monthly');
    setBalanceAfterText('1 month');
  }, [getProfit, yearlyApy]);

  React.useEffect(() => {
    switch (period) {
      case PeriodTab.Year:
        getYearly();
        break;
      case PeriodTab.Quarter:
        getQuarterly();
        break;
      case PeriodTab.Month:
        getMonthly();
        break;
    }
  }, [getMonthly, getQuarterly, getYearly, period, yearlyApy]);

  return {
    availableFundsUsd,
    entryAmountUsd,
    apy: Number(apy.toFixed(2)),
    text,
    profitTokens,
    profitUsd,
    balanceAfter,
    balanceAfterText,
  };
};
