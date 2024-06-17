import React from 'react';

import clsx from 'clsx';

import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { useDeposit, useVault } from '@/shared/hooks/vault';
import { useWithdraw } from '@/shared/hooks/vault/useWithdraw';
import { ComponentWithProps } from '@/shared/types';
import { getUserBalanceForVault, VaultType } from '@/shared/utils';

import styles from './YieldCalculatorBody.module.scss';

type YieldCalculatorProps = {
  vaultType: VaultType;
  actionType: YieldSwitchOptions;
};

export const YieldCalculatorBody: ComponentWithProps<YieldCalculatorProps> = ({
  actionType,
  vaultType,
  className,
}) => {
  const [amount, setAmount] = React.useState<string>();
  const { userDeposit } = useVault(vaultType);
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const balance = getUserBalanceForVault(vaultType, usdbBalance, wethBalance, wbtcBalance);
  const {
    deposit,
    isLoading: isDepositLoading,
    error: depositError,
    buttonMessage: depositButtonMessage,
  } = useDeposit(vaultType);
  const {
    withdraw,
    isLoading: isWithdrawLoading,
    error: withdrawError,
    buttonMessage: withdrawButtonMessage,
  } = useWithdraw(vaultType);

  const getIsSubmitButtonDisabled = React.useCallback(() => {
    const availableBalance = actionType === YieldSwitchOptions.Deposit ? balance : userDeposit;

    if (availableBalance === null) {
      return true;
    }

    return (
      !amount ||
      Number(amount) === 0 ||
      Number(amount) > availableBalance ||
      isDepositLoading ||
      isWithdrawLoading
    );
  }, [actionType, balance, isDepositLoading, isWithdrawLoading, userDeposit, amount]);

  const isSubmitButtonDisabled = getIsSubmitButtonDisabled();

  const onAmountChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // Prevents negative numbers and leading zero
    const cleanedValue = parseInt(Math.abs(Number(event.target.value)).toString(), 10).toString();
    setAmount(cleanedValue);
  }, []);

  const submitDeposit = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    await deposit(amount);
  }, [deposit, amount]);

  const submitWithdraw = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    await withdraw(amount);
  }, [withdraw, amount]);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawInput
        activeTab={actionType}
        userValue={amount}
        setUserValue={onAmountChange}
        userBalance={balance}
        vaultDeposit={userDeposit}
      />

      {actionType === YieldSwitchOptions.Deposit && (
        <DepositCalculator
          isButtonDisabled={isSubmitButtonDisabled}
          deposit={submitDeposit}
          buttonMessage={depositButtonMessage}
        />
      )}
      {actionType === YieldSwitchOptions.Withdraw && (
        <WithdrawCalculator
          withdraw={submitWithdraw}
          isButtonDisabled={isSubmitButtonDisabled}
          buttonMessage={withdrawButtonMessage}
        />
      )}
    </div>
  );
};
