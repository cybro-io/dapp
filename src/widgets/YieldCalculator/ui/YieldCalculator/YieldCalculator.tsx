'use client';

import React from 'react';

import clsx from 'clsx';

import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput, DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { useDeposit, useVault } from '@/shared/hooks/vault';
import { ComponentWithProps } from '@/shared/types';
import { getUserBalanceForVault, VaultType } from '@/shared/utils';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {
  vaultType: VaultType;
};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({
  vaultType,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<string | number>(YieldSwitchOptions.Deposit);
  const [userValue, setUserValue] = React.useState<number>(0);
  const { userDeposit } = useVault(vaultType);
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const balance = getUserBalanceForVault(vaultType, usdbBalance, wethBalance, wbtcBalance);
  const { deposit, isLoading, error, buttonMessage } = useDeposit(vaultType);

  const getIsSubmitButtonDisabled = React.useCallback(() => {
    const availableBalance = activeTab === YieldSwitchOptions.Deposit ? balance : userDeposit;

    if (availableBalance === null) {
      return true;
    }

    return !userValue || userValue > availableBalance || isLoading;
  }, [activeTab, balance, isLoading, userDeposit, userValue]);

  const isSubmitButtonDisabled = getIsSubmitButtonDisabled();

  const submitDeposit = React.useCallback(async () => {
    await deposit(userValue);
  }, [deposit, userValue]);

  const submitWithdraw = React.useCallback(() => {}, []);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <DepositWithdrawInput
        activeTab={activeTab}
        userValue={userValue}
        setUserValue={setUserValue}
        userBalance={balance}
        vaultDeposit={userDeposit}
      />

      {activeTab === YieldSwitchOptions.Deposit && (
        <DepositCalculator
          isButtonDisabled={isSubmitButtonDisabled}
          deposit={submitDeposit}
          buttonMessage={buttonMessage}
        />
      )}
      {activeTab === YieldSwitchOptions.Withdraw && (
        <WithdrawCalculator isButtonDisabled={isSubmitButtonDisabled} />
      )}
    </div>
  );
};
