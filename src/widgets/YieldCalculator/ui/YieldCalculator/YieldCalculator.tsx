import React from 'react';

import clsx from 'clsx';

import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps, Money, Nullable, Vault } from '@/shared/types';
import { VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator/ui/YieldCalculatorBody';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {
  tokenIcon: string;
  vaultContract: Nullable<Vault>;
  userDeposit: Nullable<Money>;
  currency: VaultCurrency;
};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({
  tokenIcon,
  vaultContract,
  currency,
  userDeposit,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <YieldCalculatorBody
        currency={currency}
        actionType={activeTab}
        userDeposit={userDeposit}
        tokenIcon={tokenIcon}
        vaultContract={vaultContract}
      />
    </div>
  );
};
