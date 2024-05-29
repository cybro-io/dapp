'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';

import TimerIcon from '../assets/icons/timer.svg';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {};

enum SwitchOptions {
  Withdraw = 'withdraw',
  Deposit = 'deposit',
}

const tabs = [
  {
    title: 'Withdraw',
    key: SwitchOptions.Withdraw,
  },
  {
    title: 'Deposit',
    key: SwitchOptions.Deposit,
  },
];

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string | number>(tabs[0].key);
  const [value, setValue] = React.useState<number>(0);
  const { isConnected } = useWeb3ModalAccount();
  const { erc20Balance } = useBalances();

  return (
    <div className={clsx(styles.root, className)}>
      <Tabs className={styles.tabs} onSelectionChange={setActiveTab} fullWidth size="lg">
        {tabs.map(({ title, key }) => (
          <Tab
            key={key}
            title={title}
            className={clsx(styles.tab, key === activeTab && styles.activeTab)}
          />
        ))}
      </Tabs>

      <div className={styles.calculator}>
        <div className={styles.userInfo}>
          <div className={styles.availableFunds}>
            <Text className={styles.title} textView={TextView.C3}>
              Available Funds
            </Text>
            <Text className={styles.value} textView={TextView.P1}>
              {activeTab === SwitchOptions.Deposit && erc20Balance
                ? formatMoney(erc20Balance)
                : '100,000'}
            </Text>
            <Text className={styles.equal} textView={TextView.C3}>
              ≈{' '}
              {activeTab === SwitchOptions.Deposit && erc20Balance
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
              value={value}
              type="number"
              onChange={event => setValue(Number(event.target.value))}
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

      {activeTab === SwitchOptions.Deposit && (
        <React.Fragment>
          <div className={styles.projectedYield}>
            <div className={styles.tabsContainer}>
              <Tabs className={styles.yieldTabs} size="sm">
                <Tab key="year" title="Year" />
                <Tab key="quarter" title="Quarter" />
                <Tab key="month" title="Month" />
              </Tabs>
              <Text textView={TextView.C2} className={styles.weeklyApy}>
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
        </React.Fragment>
      )}

      {activeTab === SwitchOptions.Withdraw && (
        <div className={styles.yourWithdraw}>
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
              <span className={styles.timerIconContainer}>
                <TimerIcon />
              </span>
              4:20
            </Text>
            <div className={styles.currentRateContainer}>
              <Text className={styles.currentRateTitle} textView={TextView.C3}>
                Current Rate:
              </Text>
              <Text className={styles.currentRateValue} textView={TextView.C3}>
                <span className={styles.scoreIconContainer}>
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
      )}
      <Button disabled={!isConnected} className={styles.submitButton}>
        {activeTab}
      </Button>
    </div>
  );
};
