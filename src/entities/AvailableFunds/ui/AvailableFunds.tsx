import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps, Money, Nullable } from '@/shared/types';
import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

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
    if (deposit) {
      return {
        firstTitle: 'Your Deposit:',
        firstValue: userDeposit,
        secondTitle: 'Earnings Monthly:',
        secondValue: '$0.00',
      };
    }

    return {
      firstTitle: 'Available Funds:',
      firstValue: availableFunds,
    };
  }, [availableFunds, deposit, userDeposit]);

  const { firstTitle, firstValue, secondTitle, secondValue } = getData();

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
        {!deposit ? (
          <Button
            view={ButtonView.Secondary}
            size={ButtonSize.Small}
            className={styles.depositButton}
          >
            Deposit
          </Button>
        ) : (
          <div className={styles.funds}>
            <Text className={styles.fundsTitle} textView={TextView.C3}>
              {secondTitle}
            </Text>
            <Text className={styles.fundsValue} textView={TextView.P3}>
              {secondValue}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
