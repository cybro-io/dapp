'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps, Maybe, Money } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './DepositWithdrawInput.module.scss';

type DepositWithdrawInputProps = {
  currency: string;
  tokenIcon: string;
  userValue: Maybe<string>;
  userValueUsd: Maybe<Money>;
  setUserValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: string | number;
  chain: string;
  userBalance: Money;
  availableFunds?: Money;
  availableFundsUsd?: Money;
  selectedPercent: number | null;
  setSelectedPercent: (value: number) => void;
};

export const percentButtons = [
  {
    title: '5%',
    value: 0.05,
  },
  {
    title: '25%',
    value: 0.25,
  },
  {
    title: '50%',
    value: 0.5,
  },
  {
    title: '75%',
    value: 0.75,
  },
  {
    title: 'Max',
    value: 1,
  },
];

export const DepositWithdrawInput: ComponentWithProps<DepositWithdrawInputProps> = ({
  currency,
  tokenIcon,
  userValue,
  userValueUsd,
  setUserValue,
  chain,
  activeTab,
  userBalance,
  availableFunds,
  availableFundsUsd,
  selectedPercent,
  setSelectedPercent,
  className,
}) => {
  const getData = React.useCallback(() => {
    if (activeTab === YieldSwitchOptions.Deposit) {
      return {
        availableFundsValue: formatUserMoney(userBalance),
        availableFundsValueUsd: formatUserMoney(availableFundsUsd),
      };
    }

    return {
      availableFundsValue: formatUserMoney(availableFunds),
      availableFundsValueUsd: formatUserMoney(availableFundsUsd),
    };
  }, [activeTab, userBalance, availableFunds, availableFundsUsd]);

  const { availableFundsValue, availableFundsValueUsd } = getData();

  const numberInputOnWheelPreventChange = (event: any) => {
    // Prevent the input value change
    event.target.blur();

    // Prevent the page/container scrolling
    event.stopPropagation();

    setTimeout(() => {
      event.target.focus();
    }, 0);
  };

  return (
    <div className={clsx(styles.calculator, className)}>
      <div className={styles.userInfo}>
        <div className={styles.availableFunds}>
          <Text className={styles.title} textView={TextView.C3}>
            Available Funds
          </Text>
          <Text className={styles.value} textView={TextView.P1}>
            {availableFundsValue}
          </Text>
          <Text className={styles.equal} textView={TextView.C3}>
            ≈ ${availableFundsValueUsd}
          </Text>
        </div>
        <div className={styles.currentToken}>
          <Text className={styles.title} textView={TextView.C3}>
            Current Token
          </Text>
          <div className={styles.value}>
            <div className={styles.iconContainer}>
              <Image src={tokenIcon} alt={''} height={24} width={24} />
            </div>
            <div className={styles.tokenValue}>
              <Text className={styles.value} textView={TextView.P1}>
                {activeTab === YieldSwitchOptions.Withdraw && 'cy'}
                {currency}
              </Text>
              <Text className={styles.network} textView={TextView.C3}>
                On {chain}
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
            onChange={setUserValue}
            placeholder={'0'}
            onWheel={numberInputOnWheelPreventChange}
          />
          <span className={styles.equal}>≈ ${formatUserMoney(userValueUsd)}</span>
        </div>
        <div className={styles.percentButtons}>
          {percentButtons.map(({ title, value }) => {
            return (
              <button
                key={value}
                className={clsx(
                  styles.percentButton,
                  value === selectedPercent && styles.percentButtonSelected,
                )}
                onClick={() => setSelectedPercent(value)}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
