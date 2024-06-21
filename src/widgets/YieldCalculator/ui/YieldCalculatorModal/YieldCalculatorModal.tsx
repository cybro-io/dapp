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
import { useWithdraw } from '@/shared/hooks/vault/useWithdraw';
import { ComponentWithProps } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';
import { getUserBalanceForVault, VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator/ui/YieldCalculatorBody';

type YieldCalculatorModalProps = {
  activeTab: YieldSwitchOptions;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const searchParams = useSearchParams();
  const vaultType = searchParams.get('type') as VaultCurrency;
  const { props } = useModal();
  const type: YieldSwitchOptions = props.activeTab;

  const title = type === YieldSwitchOptions.Deposit ? 'Vault Deposit' : 'Vault Withdraw';

  return (
    <ModalLayout title={title}>
      <YieldCalculatorBody vaultType={vaultType} actionType={type} />
    </ModalLayout>
  );
};
