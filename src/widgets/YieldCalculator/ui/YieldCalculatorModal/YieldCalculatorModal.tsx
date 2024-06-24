'use client';

import React from 'react';

import { useModal } from '@/app/providers';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps, Nullable, Vault } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';
import { VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator';

type YieldCalculatorModalProps = {
  currency: VaultCurrency;
  vaultContract: Nullable<Vault>;
  tokenIcon: string;
  activeTab: YieldSwitchOptions;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const { props } = useModal() as unknown as { props: YieldCalculatorModalProps };
  const { activeTab, currency, vaultContract, tokenIcon } = props;

  const title = activeTab === YieldSwitchOptions.Deposit ? 'Vault Deposit' : 'Vault Withdraw';

  return (
    <ModalLayout title={title}>
      <YieldCalculatorBody
        currency={currency}
        actionType={activeTab}
        tokenIcon={tokenIcon}
        vaultContract={vaultContract}
      />
    </ModalLayout>
  );
};
