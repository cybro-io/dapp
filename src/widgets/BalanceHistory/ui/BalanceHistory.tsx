'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { BalanceChart } from '@/entities/BalanceChart/ui';
import { TransactionHistory } from '@/entities/TransactionHistory';
import { HistoryViewType } from '@/entities/TransactionHistory/const';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import { HistoryTab, historyTabs } from '../const';

import styles from './BalanceHistory.module.scss';

const data = [
  {
    heading: 'Withdraw',
    value: '- $1’100K',
    fee: '$49',
    date: '01.01.24 14:42',
    month: "Jan'24",
    balance: 45000,
  },
  {
    heading: 'Deposit',
    value: '+ $500K',
    fee: '$25',
    date: '01.02.24 10:30',
    month: "Feb'24",
    balance: 50000,
  },
  {
    heading: 'Withdraw',
    value: '- $300K',
    fee: '$15',
    date: '26.03.24 12:15',
    month: "Mar'24",
    balance: 60000,
  },
  {
    heading: 'Deposit',
    value: '+ $700K',
    fee: '$35',
    date: '27.04.24 09:50',
    month: "Apr'24",
    balance: 80000,
  },
  {
    heading: 'Withdraw',
    value: '- $200K',
    fee: '$10',
    date: '28.05.24 16:05',
    month: "May'24",
    balance: 45000,
  },
  // {
  //   heading: 'Deposit',
  //   value: '+ $900K',
  //   fee: '$45',
  //   date: '29.06.24 11:20',
  //   month: "Jun'24",
  //   balance: 50000,
  // },
  // {
  //   heading: 'Withdraw',
  //   value: '- $600K',
  //   fee: '$30',
  //   date: '30.07.24 13:35',
  //   month: "Jul'24",
  //   balance: 47500,
  // },
  // {
  //   heading: 'Deposit',
  //   value: '+ $800K',
  //   fee: '$40',
  //   date: '31.08.24 08:55',
  //   month: "Aug'24",
  //   balance: 55000,
  // },
];

type BalanceHistoryProps = {};

export const BalanceHistory: ComponentWithProps<BalanceHistoryProps> = ({ className }) => {
  const [historyPeriod, setHistoryPeriod] = React.useState<HistoryTab>(HistoryTab.Today);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const onTabChange = React.useCallback((period: HistoryTab) => {
    setHistoryPeriod(period);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.balanceOverview}>
          <Text className={clsx(styles.title, styles.balanceTitle)} textView={TextView.H3}>
            Balance overview
          </Text>
          <BalanceChart className={styles.balanceChart} data={data} />
        </div>
        <div className={styles.history}>
          <Text className={clsx(styles.title, styles.historyTitle)} textView={TextView.H3}>
            History
          </Text>
          <Tabs
            items={historyTabs}
            onSelectionChange={key => onTabChange(key as HistoryTab)}
            classNames={{
              base: styles.historyTabs,
              tabList: styles.tabList,
              tabContent: clsx(styles.tabContent, 'group-data-[selected=true]:text-[#000000]'),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === historyPeriod && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          <TransactionHistory
            className={styles.transactionHistory}
            data={data}
            viewType={width >= 1100 ? HistoryViewType.Infinite : HistoryViewType.Pagination}
          />
        </div>
      </div>
    </div>
  );
};
