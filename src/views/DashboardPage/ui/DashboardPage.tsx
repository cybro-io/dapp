import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { BalanceHistory } from '@/widgets/BalanceHistory';
import { DashboardInfo } from '@/widgets/DashboardInfo';

import styles from './DashboardPage.module.scss';

type DashboardPageProps = {};

export const DashboardPage: ComponentWithProps<DashboardPageProps> = ({ className }) => {
  return (
    <div className={styles.headerContainer}>
      <Text className={styles.header} textView={TextView.H1}>
        Dashboard
      </Text>
      <DashboardInfo className={styles.dashboardInfo} />
      <BalanceHistory className={styles.balanceHistory} />
    </div>
  );
};
