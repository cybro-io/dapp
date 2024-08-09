import React, { Key } from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

import {
  GetTransactionsApiV1ExchangeAddressTransactionsGetType,
  useCreateTransactionApiV1ExchangeAddressCountGet,
  useGetTransactionsApiV1ExchangeAddressTransactionsGet,
} from '@/shared/types';

export const useSwapTransactions = () => {
  const [type, setType] =
    React.useState<GetTransactionsApiV1ExchangeAddressTransactionsGetType>('All');

  const [page, setPage] = React.useState(1);

  const { address } = useWeb3ModalAccount();

  const params = {
    limit: 6,
    offset: page * 6,
    type,
  };

  const { data, isLoading: isLoadingTransactions } =
    useGetTransactionsApiV1ExchangeAddressTransactionsGet(address, params, {
      query: {
        queryKey: ['transactions', params.limit, params.offset, params.type],
        enabled: Boolean(address),
      },
    });

  const { data: countData, isLoading: isLoadingCount } =
    useCreateTransactionApiV1ExchangeAddressCountGet(
      address,
      {
        type: params.type,
      },
      {
        query: {
          queryKey: ['transactionsCount', params.type],
          enabled: Boolean(address),
        },
      },
    );

  const isLoading = isLoadingCount || isLoadingTransactions;
  const totalPages = Math.ceil((countData?.data.data.count ?? 0) / params.limit);
  const transactions = data?.data.data;

  const registerTabs = () => ({
    selectedKey: type,
    onSelectionChange: (key: Key) =>
      setType(key as GetTransactionsApiV1ExchangeAddressTransactionsGetType),
  });

  return { isLoading, totalPages, page, transactions, setPage, registerTabs };
};
