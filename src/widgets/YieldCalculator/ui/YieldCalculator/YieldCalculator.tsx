import React from 'react';

import clsx from 'clsx';

import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps, Nullable, Vault } from '@/shared/types';
import { VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator/ui/YieldCalculatorBody';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {
  vaultId: number;
  tokenIcon: string;
  apy: number;
  vaultContract: Nullable<Vault>;
  chainId: number;
  chain: string;
  currency: VaultCurrency;
};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({
  vaultId,
  tokenIcon,
  apy,
  vaultContract,
  currency,
  chainId,
  chain,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <YieldCalculatorBody
        vaultId={vaultId}
        currency={currency}
        apy={apy}
        actionType={activeTab}
        tokenIcon={tokenIcon}
        chainId={chainId}
        chain={chain}
        vaultContract={vaultContract}
      />
    </div>
  );
};
