'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { ConnectWallet } from '@/features/ConnectWallet';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import TimerIcon from '../assets/icons/timer.svg';

import styles from './WithdrawCalculator.module.scss';

type WithdrawCalculatorProps = {
  amountToWithdraw: string | undefined;
  withdraw: (amount: number) => Promise<void>;
  isButtonDisabled: boolean;
  buttonMessage: string | null;
};

export const WithdrawCalculator: ComponentWithProps<WithdrawCalculatorProps> = ({
  amountToWithdraw,
  withdraw,
  isButtonDisabled,
  buttonMessage,
  className,
}) => {
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
            {formatUserMoney(amountToWithdraw)}
          </Text>
          <Text className={styles.resultActualValue}>≈ ${formatUserMoney(amountToWithdraw)}</Text>
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
      {!isConnected ? (
        <ConnectWallet className={styles.connectButton} isForm />
      ) : (
        <Button disabled={isButtonDisabled} className={styles.submitButton} onClick={withdraw}>
          {buttonMessage || 'Withdraw'}
        </Button>
      )}
    </div>
  );
};
