import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps, Money, Nullable } from '@/shared/types';
import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';
import { formatUserMoney, isInvalid } from '@/shared/utils';

import styles from './AvailableFunds.module.scss';

type AvailableFundsProps = {
  balance: Money;
  tokenIcon: Nullable<string>;
  deposit?: Money;
};

export const AvailableFunds: ComponentWithProps<AvailableFundsProps> = ({
  balance,
  deposit,
  tokenIcon,
  className,
}) => {
  const userDeposit = deposit && formatUserMoney(deposit);
  const availableFunds = formatUserMoney(balance);

  const getData = React.useCallback(() => {
    if (userDeposit !== '0' && userDeposit !== 0 && !isInvalid(userDeposit)) {
      return {
        firstTitle: 'Your Deposit:',
        firstValue: `$${userDeposit}`,
      };
    }

    return {
      firstTitle: 'Available Funds:',
      firstValue: `$${availableFunds}`,
    };
  }, [availableFunds, userDeposit]);

  const { firstTitle, firstValue } = getData();

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.availableFundsInnerContainer}>
        <div className={styles.funds}>
          <Text className={styles.fundsTitle} textView={TextView.C3}>
            {firstTitle}
          </Text>
          <Text className={styles.fundsValue} textView={TextView.P3}>
            <span className={styles.tetherIconContainer}>
              {tokenIcon && <Image src={tokenIcon} alt={''} height={16} width={16} />}
            </span>
            {firstValue}
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
