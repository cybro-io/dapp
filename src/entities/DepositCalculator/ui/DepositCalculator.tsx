'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { ConnectWallet } from '@/features/ConnectWallet';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';

import styles from './DepositCalculator.module.scss';

type DepositCalculatorProps = {
  deposit: (amount: number) => Promise<void>;
  buttonMessage: string | null;
  isButtonDisabled: boolean;
};

export const DepositCalculator: ComponentWithProps<DepositCalculatorProps> = ({
  deposit,
  buttonMessage,
  isButtonDisabled,
  className,
}) => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.projectedYield}>
        <div className={styles.tabsContainer}>
          <Tabs className={styles.yieldTabs} size="sm">
            <Tab key="year" title="Year" />
            <Tab key="quarter" title="Quarter" />
            <Tab key="month" title="Month" />
          </Tabs>
          <Text textView={TextView.C2}>
            Weekly APY <span className={styles.weeklyApyPercents}>9,25%</span>
          </Text>
        </div>
        <div className={styles.yieldContainer}>
          <Text className={styles.resultTitle} textView={TextView.C3}>
            Projected Yield after Fees:
          </Text>
          <div className={styles.yieldValuesContainer}>
            <Text className={styles.resultValue}>+ $100,000</Text>
            <Text className={styles.resultActualValue}>≈ $10,000.00</Text>
          </div>
          <div className={styles.yieldPercents}>
            <div>
              <ScoreUpIcon />
            </div>
            <Text textView={TextView.C3}>4,50% yearly</Text>
          </div>
        </div>
      </div>

      <Text textView={TextView.C2} className={styles.balanceAfter}>
        balance after 1 year <span className={styles.balanceAfterValue}>$109,990.22</span>
      </Text>

      {!isConnected ? (
        <ConnectWallet className={styles.connectButton} />
      ) : (
        <Button disabled={isButtonDisabled} className={styles.submitButton} onClick={deposit}>
          {buttonMessage || 'Deposit'}
        </Button>
      )}
    </div>
  );
};