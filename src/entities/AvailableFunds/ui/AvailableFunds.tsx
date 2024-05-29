import React from 'react';

import clsx from 'clsx';

import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';

import styles from './AvailableFunds.module.scss';

type AvailableFundsProps = {
  balance: string;
};

export const AvailableFunds: ComponentWithProps<AvailableFundsProps> = ({ balance, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.availableFundsInnerContainer}>
        <div className={styles.funds}>
          <Text className={styles.fundsTitle} textView={TextView.C3}>
            Available Funds:
          </Text>
          <Text className={styles.fundsValue} textView={TextView.P3}>
            <span className={styles.tetherIconContainer}>
              <TetherIcon />
            </span>
            {formatMoney(balance)}
          </Text>
        </div>
        <Button
          view={ButtonView.Secondary}
          size={ButtonSize.Small}
          className={styles.depositButton}
        >
          Deposit
        </Button>
      </div>
    </div>
  );
};
