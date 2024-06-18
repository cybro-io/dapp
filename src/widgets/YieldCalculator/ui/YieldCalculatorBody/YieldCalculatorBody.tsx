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
  const [selectedPercent, setSelectedPercent] = React.useState<number | null>(null);
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
    // Allow only digits and a single decimal point
    const inputValue = event.target.value.replace(/[^0-9.]/g, '');

    // Remove leading zeros and prevent multiple decimal points
    const cleanedValue = inputValue.split('.').reduce((acc, part, index) => {
      return index === 0 ? String(Number(part)) : acc + '.' + part;
    }, '');

    setSelectedPercent(null);
    setAmount(cleanedValue);
  }, []);

  const onPercentButtonClick = React.useCallback(
    (value: number) => {
      if (balance === null || userDeposit === null) {
        return;
      }

      if (actionType === YieldSwitchOptions.Deposit) {
        setAmount((balance * value).toFixed(2).toString());
      }

      if (actionType === YieldSwitchOptions.Withdraw) {
        setAmount((userDeposit * value).toFixed(2).toString());
      }

      setSelectedPercent(value);
    },
    [actionType, balance, userDeposit],
  );

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
        selectedPercent={selectedPercent}
        setSelectedPercent={onPercentButtonClick}
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
          amountToWithdraw={amount}
        />
      )}
    </div>
  );
};
