'use client';

import React from 'react';

import { chain } from '@react-aria/utils';

import { useModal } from '@/app/providers';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps, Money, Nullable, Vault } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';
import { VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator';

type YieldCalculatorModalProps = {
  currency: VaultCurrency;
  vaultId: number;
  chainId: number;
  vaultContract: Nullable<Vault>;
  tokenIcon: string;
  userDeposit: Nullable<Money>;
  activeTab: YieldSwitchOptions;
  chain: string;
  apy: number;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const { props } = useModal() as unknown as { props: YieldCalculatorModalProps };
  const { activeTab, currency, apy, chain, chainId, vaultContract, tokenIcon, vaultId } = props;

  const title = activeTab === YieldSwitchOptions.Deposit ? 'Vault Deposit' : 'Vault Withdraw';

  return (
    <ModalLayout title={title}>
      <YieldCalculatorBody
        vaultId={vaultId}
        currency={currency}
        actionType={activeTab}
        tokenIcon={tokenIcon}
        chainId={chainId}
        vaultContract={vaultContract}
        chain={chain}
        apy={apy}
      />
    </ModalLayout>
  );
};
