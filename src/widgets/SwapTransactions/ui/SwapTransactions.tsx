'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import { useMediaQuery } from 'usehooks-ts';

import { ExchangeTransactionRow } from '@/entities/ExchangeTransaction';
import { Pagination, Text, TextView } from '@/shared/ui';

import { useSwapTransactions } from '../model/useSwapTransactions';
import { SwapTransactionsLoader } from './SwapTransactionsLoader';

export const SwapTransactions = () => {
  const { transactions, setPage, page, totalPages, isLoading, registerTabs, isEmptyTransactions } =
    useSwapTransactions();

  const items = ['All', 'Swap', 'Exchange'];

  const isSmallScreen = useMediaQuery('(max-width: 1280px)');

  return (
    <div className="flex-1 flex flex-col gap-6 items-center lg:items-stretch">
      <Text textView={isSmallScreen ? TextView.H4 : TextView.H2}>Transactions History</Text>
      <Tabs
        aria-label="exchange-transactions-tabs"
        disabledKeys={['Exchange']}
        classNames={{
          base: 'w-full max-w-[375px] lg:w-fit',
          tabList: 'w-full rounded-full bg-background-chips',
          cursor: 'rounded-full dark:bg-white',
          tabContent: 'group-data-[selected=true]:text-black/100 font-poppins text-xs font-medium',
        }}
        {...registerTabs()}
      >
        {items.map(item => (
          <Tab key={item} title={item}>
            <div className="grid">
              {isLoading && <SwapTransactionsLoader />}
              {isEmptyTransactions && (
                <Text textView={TextView.H4} className="!my-60 text-center">
                  No transactions found
                </Text>
              )}
              {!isLoading &&
                transactions?.map((transaction, index) => (
                  <ExchangeTransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    isContained={index % 2 === 0}
                  />
                ))}
            </div>
          </Tab>
        ))}
      </Tabs>
      <Pagination page={page} onChange={setPage} total={totalPages} showControls boundaries={2} />
    </div>
  );
};
