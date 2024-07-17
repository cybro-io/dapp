'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { TransactionHistory } from '@/entities/TransactionHistory';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import { HistoryTab, historyTabs } from '../const';

import styles from './BalanceHistory.module.scss';

type BalanceHistoryProps = {};

export const BalanceHistory: ComponentWithProps<BalanceHistoryProps> = ({ className }) => {
  const [historyPeriod, setHistoryPeriod] = React.useState<HistoryTab>(HistoryTab.Today);

  const onTabChange = React.useCallback((period: HistoryTab) => {
    setHistoryPeriod(period);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.balanceOverview}>
        <Text className={styles.title} textView={TextView.H3}>
          Balance overview
        </Text>
      </div>
      <div className={styles.history}>
        <Text className={styles.title} textView={TextView.H3}>
          History
        </Text>
        <Tabs
          items={historyTabs}
          onSelectionChange={key => onTabChange(key as HistoryTab)}
          classNames={{
            base: styles.base,
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
        <TransactionHistory />
      </div>
    </div>
  );
};
