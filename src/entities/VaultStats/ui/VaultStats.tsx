'use client';

import React from 'react';

import clsx from 'clsx';

import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Link, LinkView, Text, TextView } from '@/shared/ui';

import { VaultStatsView } from '../const';

import styles from './VaultStats.module.scss';

type TableProps = {
  weeklyApy: string | number;
  cybroPoints: string | number;
  tvl: string | number;
  provider: string;
  overallVaultInvestment?: string | number;
  yourDeposit?: string | number;
  availableFunds?: string | number;
  earningsMonthly?: string | number;
  viewType?: VaultStatsView;
};

export const VaultStats: ComponentWithProps<TableProps> = ({
  weeklyApy,
  cybroPoints,
  tvl,
  provider,
  overallVaultInvestment,
  yourDeposit,
  availableFunds,
  earningsMonthly,
  viewType = VaultStatsView.Card,
  className,
}) => {
  return (
    <div className={clsx(styles.root, styles[viewType], className)}>
      <div className={clsx(styles.firstRow, styles.row)}>
        <div className={styles.detailsItem}>
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            Weekly APY
          </Text>
          <Text textView={TextView.P3} className={clsx(styles.detailsValue, styles.weeklyApyValue)}>
            {weeklyApy}%
          </Text>
        </div>
        <div className={styles.detailsItem}>
          <Link viewType={LinkView.Tooltip} className={styles.detailsTitle}>
            Cybro Points
          </Link>
          <Text textView={TextView.P3} className={styles.detailsValue}>
            {cybroPoints}%
          </Text>
        </div>
        {viewType === VaultStatsView.Full && (
          <React.Fragment>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                TVL
              </Text>
              <Text textView={TextView.P3} className={styles.detailsValue}>
                ${tvl}
              </Text>
            </div>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                Provider
              </Text>
              <Chip>{provider}</Chip>
            </div>
          </React.Fragment>
        )}
      </div>

      <div className={clsx(styles.secondRow, styles.row)}>
        {viewType === VaultStatsView.Card && (
          <React.Fragment>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                TVL
              </Text>
              <Text textView={TextView.P3} className={styles.detailsValue}>
                ${tvl}
              </Text>
            </div>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                Provider
              </Text>
              <Chip>{provider}</Chip>
            </div>
          </React.Fragment>
        )}

        {viewType === VaultStatsView.Full && (
          <React.Fragment>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                Overall Vault Investments
              </Text>
              <Text
                textView={TextView.P3}
                className={clsx(styles.detailsValue, styles.overallInvestmentValue)}
              >
                $<span>{overallVaultInvestment}</span>
              </Text>
            </div>
            {!!yourDeposit && (
              <div className={styles.detailsItem}>
                <Text textView={TextView.C3} className={styles.detailsTitle}>
                  Your Deposit
                </Text>
                <Text
                  textView={TextView.P3}
                  className={clsx(styles.detailsItem, styles.yourDepositValue)}
                >
                  <span className={styles.tetherIconContainer}>
                    <TetherIcon />
                  </span>
                  ${yourDeposit}
                </Text>
              </div>
            )}
            {!!availableFunds && (
              <div className={styles.detailsItem}>
                <Text textView={TextView.C3} className={styles.detailsTitle}>
                  Available Funds
                </Text>
                <Text
                  textView={TextView.P3}
                  className={clsx(styles.detailsValue, styles.availableFundsValue)}
                >
                  <span className={styles.tetherIconContainer}>
                    <TetherIcon />
                  </span>
                  ${availableFunds}
                </Text>
              </div>
            )}
            {!!earningsMonthly && (
              <div className={styles.detailsItem}>
                <Text textView={TextView.C3} className={styles.detailsTitle}>
                  Earnings Monthly
                </Text>
                <Text
                  textView={TextView.P3}
                  className={clsx(styles.detailsValue, styles.earningsMonthlyValue)}
                >
                  ${earningsMonthly}
                </Text>
              </div>
            )}
          </React.Fragment>
        )}
      </div>

      {viewType === VaultStatsView.Card && !!overallVaultInvestment && (
        <div className={clsx(styles.thirdRow, styles.row)}>
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Overall Vault Investments
            </Text>
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.overallInvestmentValue)}
            >
              ${overallVaultInvestment}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
