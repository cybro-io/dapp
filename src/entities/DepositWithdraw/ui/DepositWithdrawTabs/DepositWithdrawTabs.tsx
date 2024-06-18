import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';

import styles from './DepositWithdrawTabs.module.scss';

const tabs = [
  {
    title: 'Withdraw',
    key: YieldSwitchOptions.Withdraw,
  },
  {
    title: 'Deposit',
    key: YieldSwitchOptions.Deposit,
  },
];

type DepositWithdrawTabsProps = {
  activeTab: YieldSwitchOptions;
  setActiveTab: React.Dispatch<React.SetStateAction<string | number>>;
};

export const DepositWithdrawTabs: ComponentWithProps<DepositWithdrawTabsProps> = ({
  activeTab,
  setActiveTab,
  className,
}) => {
  return (
    <Tabs<YieldSwitchOptions>
      className={styles.tabs}
      onSelectionChange={setActiveTab}
      defaultSelectedKey={activeTab}
      fullWidth
      size="lg"
    >
      {tabs.map(({ title, key }) => (
        <Tab
          key={key}
          title={title}
          className={clsx(styles.tab, key === activeTab && styles.activeTab)}
        />
      ))}
    </Tabs>
  );
};
