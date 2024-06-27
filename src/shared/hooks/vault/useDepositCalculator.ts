import React from 'react';

import { Maybe, Money, useGetPriceApiV1MarketDataPriceGet } from '@/shared/types';
import { convertToUsd, VaultCurrency } from '@/shared/utils';

type UseDepositCalculator = {
  availableFundsUsd: Money;
  entryAmountUsd: Money;
};

export const useDepositCalculator = (
  amountToDeposit: Maybe<string> = '0',
  balance: Money,
  token: VaultCurrency,
  chainId: number,
): UseDepositCalculator => {
  const { data } = useGetPriceApiV1MarketDataPriceGet({
    token,
    chain_id: chainId,
  });

  const tokenPrice = Number(data?.data?.data?.price);

  const [availableFundsUsd, setAvailableFundsUsd] = React.useState<Money>(0);
  const [entryAmountUsd, setEntryAmountUsd] = React.useState<Money>(0);

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

  return {
    availableFundsUsd,
    entryAmountUsd,
  };
};
