import React from 'react';

import clsx from 'clsx';

import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';
import { VaultType } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator/ui/YieldCalculatorBody';

import styles from './YieldCalculator.module.scss';

type YieldCalculatorProps = {
  vaultType: VaultType;
};

export const YieldCalculator: ComponentWithProps<YieldCalculatorProps> = ({
  vaultType,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <YieldCalculatorBody vaultType={vaultType} actionType={activeTab} />
    </div>
  );
};