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
  vaultContract: Nullable<Vault>;
  chainId: number;
  currency: VaultCurrency;
};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({
  vaultId,
  tokenIcon,
  vaultContract,
  currency,
  chainId,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <YieldCalculatorBody
        vaultId={vaultId}
        currency={currency}
        actionType={activeTab}
        tokenIcon={tokenIcon}
        chainId={chainId}
        vaultContract={vaultContract}
      />
    </div>
  );
};
