'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';

import TimerIcon from '../assets/icons/timer.svg';

import styles from './WithdrawCalculator.module.scss';

type WithdrawCalculatorProps = {};

export const WithdrawCalculator: ComponentWithProps<WithdrawCalculatorProps> = ({ className }) => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <div className={styles.root}>
      <div className={clsx(styles.yourWithdraw, className)}>
        <Text className={styles.resultTitle} textView={TextView.C3}>
          Your Withdraw:
        </Text>
        <div className={styles.yourWithdrawResultContainer}>
          <Text className={styles.resultValue}>
            <span className={styles.tetherIconContainer}>
              <TetherIcon />
            </span>
            500’000
          </Text>
          <Text className={styles.resultActualValue}>≈ $10,000.00</Text>
        </div>
        <div className={styles.middleLine}>
          <Text className={styles.timer} textView={TextView.C3}>
            <span>
              <TimerIcon />
            </span>
            4:20
          </Text>
          <div className={styles.currentRateContainer}>
            <Text textView={TextView.C3}>Current Rate:</Text>
            <Text className={styles.currentRateValue} textView={TextView.C3}>
              <span>
                <ScoreUpIcon />
              </span>
              $0.98
            </Text>
          </div>
        </div>
        <div className={styles.feeContainer}>
          <Text className={styles.feeTitle} textView={TextView.C2}>
            Withdraw fee
          </Text>
          <Text textView={TextView.C1}>5%</Text>
        </div>
      </div>
      <Button disabled={!isConnected} className={styles.submitButton}>
        Withdraw
      </Button>
    </div>
  );
};
