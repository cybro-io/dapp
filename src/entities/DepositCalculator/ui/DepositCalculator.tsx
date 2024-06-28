'use client';

import React, { Key } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { PeriodTab } from '@/entities/DepositCalculator/const';
import { ConnectWallet } from '@/features/ConnectWallet';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import { ComponentWithProps, Money } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';
import { formatMoney, formatUserMoney } from '@/shared/utils';

import styles from './DepositCalculator.module.scss';

type DepositCalculatorProps = {
  deposit: (amount: number) => Promise<void>;
  apy: number;
  setPeriod: React.Dispatch<React.SetStateAction<PeriodTab>>;
  buttonMessage: string | null;
  isButtonDisabled: boolean;
  text: string;
  profitUsd: Money;
  profitTokens: Money;
  balanceAfter: Money;
  balanceAfterText: string;
};

const periods = [
  {
    key: PeriodTab.Year,
    title: 'Year',
  },
  {
    key: PeriodTab.Quarter,
    title: 'Quarter',
  },
  {
    key: PeriodTab.Month,
    title: 'Month',
  },
];

export const DepositCalculator: ComponentWithProps<DepositCalculatorProps> = ({
  deposit,
  apy,
  setPeriod,
  buttonMessage,
  isButtonDisabled,
  text,
  profitUsd,
  profitTokens,
  balanceAfter,
  balanceAfterText,
  className,
}) => {
  const { isConnected } = useWeb3ModalAccount();

  const onTabChange = React.useCallback(
    (currentTab: Key) => {
      setPeriod(currentTab as PeriodTab);
      Mixpanel.track(MixpanelEvent.CalculatorPeriodChange, { period: currentTab });
    },
    [setPeriod],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.projectedYield}>
        <div className={styles.tabsContainer}>
          <Tabs className={styles.yieldTabs} size="sm" onSelectionChange={onTabChange}>
            {periods.map(({ key, title }) => (
              <Tab key={key} title={title} />
            ))}
          </Tabs>
        </div>
        <div className={styles.yieldContainer}>
          <Text className={styles.resultTitle} textView={TextView.C3}>
            Projected Yield after Fees:
          </Text>
          <div className={styles.yieldValuesContainer}>
            <Text className={styles.resultValue}>+ {formatMoney(profitTokens || 0, 6)}</Text>
            <Text className={styles.resultActualValue}>≈ ${formatUserMoney(profitUsd)}</Text>
          </div>
          <div className={styles.yieldPercents}>
            <div>
              <ScoreUpIcon />
            </div>
            <Text textView={TextView.C3}>
              {apy}% {text}
            </Text>
          </div>
        </div>
      </div>

      <Text textView={TextView.C2} className={styles.balanceAfter}>
        balance after {balanceAfterText}{' '}
        <span className={styles.balanceAfterValue}>{formatMoney(balanceAfter || 0, 6)}</span>
      </Text>

      {!isConnected ? (
        <ConnectWallet className={styles.connectButton} isForm />
      ) : (
        <Button disabled={isButtonDisabled} className={styles.submitButton} onClick={deposit}>
          {buttonMessage || 'Deposit'}
        </Button>
      )}
    </div>
  );
};
