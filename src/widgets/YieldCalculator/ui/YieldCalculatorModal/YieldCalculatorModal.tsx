'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { useModal } from '@/app/providers';
import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { useDeposit, useVault } from '@/shared/hooks/vault';
import { ComponentWithProps } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';
import { getUserBalanceForVault, VaultType } from '@/shared/utils';

type YieldCalculatorModalProps = {
  activeTab: YieldSwitchOptions;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const searchParams = useSearchParams();
  const vaultType = searchParams.get('type') as VaultType;
  const { props } = useModal();
  const type: YieldSwitchOptions = props.activeTab;

  const [userValue, setUserValue] = React.useState<number>(0);
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const { userDeposit } = useVault(vaultType);

  const balance = getUserBalanceForVault(vaultType, usdbBalance, wethBalance, wbtcBalance);

  const { deposit, isLoading, error, buttonMessage } = useDeposit(vaultType);

  const title = type === YieldSwitchOptions.Deposit ? 'Vault Deposit' : 'Vault Withdraw';

  const getIsSubmitButtonDisabled = React.useCallback(() => {
    const availableBalance = type === YieldSwitchOptions.Deposit ? balance : userDeposit;

    if (availableBalance === null) {
      return true;
    }

    return !userValue || userValue > availableBalance || isLoading;
  }, [type, balance, isLoading, userDeposit, userValue]);

  const isSubmitButtonDisabled = getIsSubmitButtonDisabled();

  const submitDeposit = React.useCallback(async () => {
    await deposit(userValue);
  }, [deposit, userValue]);

  return (
    <ModalLayout title={title}>
      <DepositWithdrawInput
        userValue={userValue}
        setUserValue={setUserValue}
        activeTab={type}
        userBalance={balance}
        vaultDeposit={userDeposit}
      />
      {type === YieldSwitchOptions.Deposit && (
        <DepositCalculator
          deposit={submitDeposit}
          buttonMessage={buttonMessage}
          isButtonDisabled={isSubmitButtonDisabled}
        />
      )}
      {type === YieldSwitchOptions.Withdraw && (
        <WithdrawCalculator isButtonDisabled={isSubmitButtonDisabled} />
      )}
    </ModalLayout>
  );
};
