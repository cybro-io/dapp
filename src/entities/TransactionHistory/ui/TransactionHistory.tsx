'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { isEven } from '@/shared/utils';

import { TransactionHistoryItem } from './components';
import styles from './TransactionHistory.module.scss';

type TransactionHistoryProps = {};

const data = [
  {
    heading: 'Withdraw',
    value: '- $1’100K',
    fee: '$49',
    date: '24.05.24 14:42',
  },
  {
    heading: 'Deposit',
    value: '+ $500K',
    fee: '$25',
    date: '25.05.24 10:30',
  },
  {
    heading: 'Withdraw',
    value: '- $300K',
    fee: '$15',
    date: '26.05.24 12:15',
  },
  {
    heading: 'Deposit',
    value: '+ $700K',
    fee: '$35',
    date: '27.05.24 09:50',
  },
  {
    heading: 'Withdraw',
    value: '- $200K',
    fee: '$10',
    date: '28.05.24 16:05',
  },
  {
    heading: 'Deposit',
    value: '+ $900K',
    fee: '$45',
    date: '29.05.24 11:20',
  },
  {
    heading: 'Withdraw',
    value: '- $600K',
    fee: '$30',
    date: '30.05.24 13:35',
  },
  {
    heading: 'Deposit',
    value: '+ $800K',
    fee: '$40',
    date: '31.05.24 08:55',
  },
];

export const TransactionHistory: ComponentWithProps<TransactionHistoryProps> = ({ className }) => {
  return (
    <ul className={clsx(styles.root, className)}>
      {data.map(({ heading, value, fee, date }, index) => (
        <TransactionHistoryItem
          date={date}
          fee={fee}
          heading={heading}
          value={value}
          isDark={isEven(index + 1)}
          key={index}
        />
      ))}
    </ul>
  );
};
