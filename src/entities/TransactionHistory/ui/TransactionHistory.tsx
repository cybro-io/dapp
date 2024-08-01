'use client';

import React from 'react';

import clsx from 'clsx';

import { HistoryViewType } from '@/entities/TransactionHistory/const';
import { ComponentWithProps } from '@/shared/types';
import { isEven } from '@/shared/utils';

import { TransactionHistoryItem } from './components';
import styles from './TransactionHistory.module.scss';

type TransactionHistoryProps = {
  data: any[];
  viewType?: HistoryViewType;
};

export const TransactionHistory: ComponentWithProps<TransactionHistoryProps> = ({
  data,
  viewType = HistoryViewType.Pagination,
  className,
}) => {
  return (
    <ul className={clsx(styles.root, styles[viewType], className)}>
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
