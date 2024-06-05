'use client';

import React from 'react';

import clsx from 'clsx';

import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput, DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string | number>(YieldSwitchOptions.Deposit);
  const [userValue, setUserValue] = React.useState<number>(0);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <DepositWithdrawInput
        activeTab={activeTab}
        userValue={userValue}
        setUserValue={setUserValue}
      />

      {activeTab === YieldSwitchOptions.Deposit && <DepositCalculator />}
      {activeTab === YieldSwitchOptions.Withdraw && <WithdrawCalculator />}
    </div>
  );
};
