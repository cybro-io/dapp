'use client';
import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { BalanceHistory } from '@/widgets/BalanceHistory';
import { DashboardInfo } from '@/widgets/DashboardInfo';

import styles from './DashboardPage.module.scss';

type DashboardPageProps = {};

export const DashboardPage: ComponentWithProps<DashboardPageProps> = ({ className }) => {
  const { isConnected } = useWeb3ModalAccount();
  const [isToastShown, setToastShown] = React.useState(false);
  const { triggerToast } = useToast();

  const router = useRouter();

  React.useEffect(() => {
    if (!isConnected) {
      if (!isToastShown) {
        triggerToast({
          message: 'Wallet is not connected',
          description: 'You need to connect your wallet to use the Dashboard',
        });
      }
      setToastShown(true);
      router.push('/');
    }
  }, [isConnected, isToastShown, router, triggerToast]);

  if (!isConnected) {
    return null;
  }

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
