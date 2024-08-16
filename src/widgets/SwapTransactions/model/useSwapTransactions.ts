import React, { Key } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import axios, { AxiosResponse } from 'axios';

import {
  GetTransactionsApiV1ExchangeAddressTransactionsGetType,
  SymbiosisTransaction,
} from '@/shared/types';

export const useSwapTransactions = () => {
  const [type, setType] =
    React.useState<GetTransactionsApiV1ExchangeAddressTransactionsGetType>('All');

  const [page, setPage] = React.useState(1);

  const { address } = useWeb3ModalAccount();

  const limit = 6;
  const offset = (page - 1) * limit;

  const params = {
    limit,
    offset,
    type,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['transactionsList', address],
    enabled: Boolean(address),
    refetchInterval: 5000,
    queryFn: () =>
      axios.get(
        `https://api-v2.symbiosis.finance/explorer/v1/transactions/${address}`,
      ) as unknown as AxiosResponse<SymbiosisTransaction[]>,
  });

  const totalPages = Math.ceil((data?.data.length ?? 0) / params.limit);
  const transactions = data?.data.slice(offset, offset + limit);

  const registerTabs = () => ({
    selectedKey: type,
    onSelectionChange: (key: Key) =>
      setType(key as GetTransactionsApiV1ExchangeAddressTransactionsGetType),
  });

  return { isLoading, totalPages, page, transactions, setPage, registerTabs };
};
