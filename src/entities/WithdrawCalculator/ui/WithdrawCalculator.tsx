'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import Image from 'next/image';

import { ConnectWallet } from '@/features/ConnectWallet';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { ComponentWithProps, Money } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import TimerIcon from '../assets/icons/timer.svg';

import styles from './WithdrawCalculator.module.scss';

type WithdrawCalculatorProps = {
  amountToWithdraw: Money;
  amountToWithdrawUsd: Money;
  currentRate: Money;
  withdraw: (amount: number) => Promise<void>;
  isButtonDisabled: boolean;
  timer: string;
  buttonMessage: string | null;
  tokenIcon: string;
};

export const WithdrawCalculator: ComponentWithProps<WithdrawCalculatorProps> = ({
  amountToWithdraw,
  amountToWithdrawUsd,
  currentRate,
  withdraw,
  isButtonDisabled,
  timer,
  buttonMessage,
  tokenIcon,
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
              <Image src={tokenIcon} alt={''} height={20} width={20} />
            </span>
            {formatUserMoney(amountToWithdraw)}
          </Text>
          <Text className={styles.resultActualValue}>
            ≈ ${formatUserMoney(amountToWithdrawUsd)}
          </Text>
        </div>
        <div className={styles.middleLine}>
          <Text className={styles.timer} textView={TextView.C3}>
            <span>
              <TimerIcon />
            </span>
            {timer}
          </Text>
          <div className={styles.currentRateContainer}>
            <Text textView={TextView.C3}>Current Rate:</Text>
            <Text className={styles.currentRateValue} textView={TextView.C3}>
              <span>
                <ScoreUpIcon />
              </span>
              ${formatUserMoney(currentRate)}
            </Text>
          </div>
        </div>
        {/*<div className={styles.feeContainer}>*/}
        {/*  <Text className={styles.feeTitle} textView={TextView.C2}>*/}
        {/*    Withdraw fee*/}
        {/*  </Text>*/}
        {/*  <Text textView={TextView.C1}>5%</Text>*/}
        {/*</div>*/}
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
