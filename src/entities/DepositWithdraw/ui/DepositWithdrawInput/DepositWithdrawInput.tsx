'use client';

import React from 'react';

import clsx from 'clsx';

import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';

import styles from './DepositWithdrawInput.module.scss';

type DepositWithdrawInputProps = {
  userValue: number;
  setUserValue: React.Dispatch<React.SetStateAction<number>>;
  activeTab: string | number;
};

export const DepositWithdrawInput: ComponentWithProps<DepositWithdrawInputProps> = ({
  userValue,
  setUserValue,
  activeTab,
  className,
}) => {
  const { erc20Balance } = useBalances();

  return (
    <div className={clsx(styles.calculator, className)}>
      <div className={styles.userInfo}>
        <div className={styles.availableFunds}>
          <Text className={styles.title} textView={TextView.C3}>
            Available Funds
          </Text>
          <Text className={styles.value} textView={TextView.P1}>
            {activeTab === YieldSwitchOptions.Deposit && erc20Balance
              ? formatMoney(erc20Balance)
              : '100,000'}
          </Text>
          <Text className={styles.equal} textView={TextView.C3}>
            ≈{' '}
            {activeTab === YieldSwitchOptions.Deposit && erc20Balance
              ? formatMoney(erc20Balance)
              : '100,000'}
          </Text>
        </div>
        <div className={styles.currentToken}>
          <Text className={styles.title} textView={TextView.C3}>
            Current Token
          </Text>
          <div className={styles.value}>
            <div className={styles.iconContainer}>
              <TetherIcon />
            </div>
            <div className={styles.tokenValue}>
              <Text className={styles.value} textView={TextView.P1}>
                USDT
              </Text>
              <Text className={styles.network} textView={TextView.C3}>
                On Etherium
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.userInput}>
        <Text className={styles.label} textView={TextView.C3}>
          Entry Amount
        </Text>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            value={userValue}
            type="number"
            onChange={event => setUserValue(Number(event.target.value))}
          />
          <span className={styles.equal}>≈ $1,000.00</span>
        </div>
        <div className={styles.percentButtons}>
          <button className={clsx(styles.percentButton)}>5%</button>
          <button className={clsx(styles.percentButton)}>25%</button>
          <button className={clsx(styles.percentButton)}>50%</button>
          <button className={clsx(styles.percentButton)}>75%</button>
          <button className={clsx(styles.percentButton)}>Max</button>
        </div>
      </div>
    </div>
  );
};
