'use client';

import React, { useState } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import clsx from 'clsx';

import { BalanceChart } from '@/entities/BalanceChart/ui';
import { TransactionHistory } from '@/entities/TransactionHistory';
import { HistoryViewType } from '@/entities/TransactionHistory/const';
import { QueryKey } from '@/shared/const';
import {
  ComponentWithProps,
  useGetDashboardHistoryApiV1DashboardAddressHistoryGet,
} from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { getPeriodRange, groupTransactions } from '@/widgets/BalanceHistory/utils';

import { PeriodTab, periodTabs } from '../const';

import styles from './BalanceHistory.module.scss';

type BalanceHistoryProps = {};

export const BalanceHistory: ComponentWithProps<BalanceHistoryProps> = ({ className }) => {
  const { address, chainId } = useWeb3ModalAccount();
  const [period, setPeriod] = React.useState<PeriodTab>(PeriodTab.All);
  const [width, setWidth] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredTransaction, setHoveredTransaction] = React.useState<string | null>(null);

  const { since, to } = getPeriodRange(period);

  const { data, isLoading } = useGetDashboardHistoryApiV1DashboardAddressHistoryGet(
    address || '',
    {
      chain_id: chainId || 0,
      since,
      to,
    },
    {
      query: {
        queryKey: [QueryKey.DashboardHistory, address, chainId, since, to],
      },
    },
  );

  const historyData = data?.data?.data;

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

  const chartTransactions = React.useMemo(
    () => groupTransactions(historyData || [], period).reverse(),
    [historyData, period],
  );

  const onTabChange = React.useCallback((period: PeriodTab) => {
    setPeriod(period);
    setCurrentPage(1);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.balanceOverview}>
          <Text className={clsx(styles.title, styles.balanceTitle)} textView={TextView.H3}>
            Balance overview
          </Text>
          <Tabs
            items={periodTabs}
            selectedKey={period}
            onSelectionChange={key => onTabChange(key as PeriodTab)}
            classNames={{
              base: clsx(styles.historyTabs, styles.historyTabsMobile),
              tabList: styles.tabList,
              tabContent: clsx(styles.tabContent, 'group-data-[selected=true]:text-[#000000]'),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === period && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          <BalanceChart
            period={period}
            setPeriod={setPeriod}
            hoveredTransaction={hoveredTransaction}
            setHoveredTransaction={setHoveredTransaction}
            className={styles.balanceChart}
            data={chartTransactions}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.history}>
          <Text className={clsx(styles.title, styles.historyTitle)} textView={TextView.H3}>
            History
          </Text>
          <Tabs
            items={periodTabs}
            selectedKey={period}
            onSelectionChange={key => onTabChange(key as PeriodTab)}
            classNames={{
              base: clsx(styles.historyTabs, styles.historyTabsDesktop),
              tabList: styles.tabList,
              tabContent: clsx(styles.tabContent, 'group-data-[selected=true]:text-[#000000]'),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === period && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          <TransactionHistory
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            chainId={chainId || 0}
            hoveredTransaction={hoveredTransaction}
            setHoveredTransaction={setHoveredTransaction}
            data={historyData || []}
            className={styles.transactionHistory}
            viewType={width >= 1100 ? HistoryViewType.Infinite : HistoryViewType.Pagination}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
