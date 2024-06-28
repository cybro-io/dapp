'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps, Money } from '@/shared/types';
import { Chip, Text, TextView } from '@/shared/ui';
import { formatUserMoney, isInvalid } from '@/shared/utils';

import { VaultStatsView } from '../const';

import styles from './VaultStats.module.scss';

type VaultStatsProps = {
  apy: string | number;
  cybroPoints?: string | number;
  tvl: Money;
  provider: string;
  overallVaultInvestment?: Money;
  yourDeposit?: Money;
  availableFunds?: Money;
  earningsMonthly?: string | number;
  viewType?: VaultStatsView;
  tokenIcon?: string;
};

export const VaultStats: ComponentWithProps<VaultStatsProps> = ({
  apy,
  tvl,
  provider,
  yourDeposit,
  availableFunds,
  earningsMonthly,
  viewType = VaultStatsView.Card,
  tokenIcon,
  className,
}) => {
  return (
    <div className={clsx(styles.root, styles[viewType], className)}>
      <div className={clsx(styles.firstRow, styles.row)}>
        <div className={styles.detailsItem}>
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            APY
          </Text>
          <Text textView={TextView.P3} className={clsx(styles.detailsValue, styles.weeklyApyValue)}>
            {apy}%
          </Text>
        </div>
        {/*<div className={styles.detailsItem}>*/}
        {/*  <Link viewType={LinkView.Tooltip} className={styles.detailsTitle}>*/}
        {/*    Cybro Points*/}
        {/*  </Link>*/}
        {/*  <Text textView={TextView.P3} className={styles.detailsValue}>*/}
        {/*    {cybroPoints}%*/}
        {/*  </Text>*/}
        {/*</div>*/}
        {viewType === VaultStatsView.Card && (
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              TVL
            </Text>
            <Text textView={TextView.P3} className={styles.detailsValue}>
              ${formatUserMoney(tvl) || '0'}
            </Text>
          </div>
        )}
        {viewType === VaultStatsView.Full && (
          <React.Fragment>
            <div className={styles.detailsItem}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                TVL
              </Text>
              <Text textView={TextView.P3} className={styles.detailsValue}>
                ${formatUserMoney(tvl) || '0'}
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

      {(!isInvalid(yourDeposit) ||
        !isInvalid(availableFunds) ||
        !isInvalid(earningsMonthly) ||
        viewType === VaultStatsView.Card) && (
        <div className={clsx(styles.secondRow, styles.row)}>
          {viewType === VaultStatsView.Card && (
            <React.Fragment>
              {/*<div className={styles.detailsItem}>*/}
              {/*  <Text textView={TextView.C3} className={styles.detailsTitle}>*/}
              {/*    TVL*/}
              {/*  </Text>*/}
              {/*  <Text textView={TextView.P3} className={styles.detailsValue}>*/}
              {/*    ${formatUserMoney(tvl) || '0'}*/}
              {/*  </Text>*/}
              {/*</div>*/}
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
              {/*<div className={styles.detailsItem}>*/}
              {/*  <Text textView={TextView.C3} className={styles.detailsTitle}>*/}
              {/*    Overall Vault Investments*/}
              {/*  </Text>*/}
              {/*  <Text*/}
              {/*    textView={TextView.P3}*/}
              {/*    className={clsx(styles.detailsValue, styles.overallInvestmentValue)}*/}
              {/*  >*/}
              {/*    $<span>{formatUserMoney(overallVaultInvestment)}</span>*/}
              {/*  </Text>*/}
              {/*</div>*/}
              {!isInvalid(yourDeposit) && (
                <div className={styles.detailsItem}>
                  <Text textView={TextView.C3} className={styles.detailsTitle}>
                    Your Deposit
                  </Text>
                  <Text
                    textView={TextView.P3}
                    className={clsx(styles.detailsItem, styles.yourDepositValue)}
                  >
                    {tokenIcon && (
                      <span className={styles.tetherIconContainer}>
                        <Image src={tokenIcon} alt={''} height={24} width={24} />
                      </span>
                    )}
                    ${formatUserMoney(yourDeposit)}
                  </Text>
                </div>
              )}
              {!isInvalid(availableFunds) && (
                <div className={styles.detailsItem}>
                  <Text textView={TextView.C3} className={styles.detailsTitle}>
                    Available Funds
                  </Text>
                  <Text
                    textView={TextView.P3}
                    className={clsx(styles.detailsValue, styles.availableFundsValue)}
                  >
                    {tokenIcon && (
                      <span className={styles.tetherIconContainer}>
                        <Image src={tokenIcon} alt={''} height={24} width={24} />
                      </span>
                    )}
                    ${formatUserMoney(availableFunds)}
                  </Text>
                </div>
              )}
              {!isInvalid(earningsMonthly) && (
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
      )}

      {/*{viewType === VaultStatsView.Card && !!overallVaultInvestment && (*/}
      {/*  <div className={clsx(styles.thirdRow, styles.row)}>*/}
      {/*    <div className={styles.detailsItem}>*/}
      {/*      <Text textView={TextView.C3} className={styles.detailsTitle}>*/}
      {/*        Overall Vault Investments*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        textView={TextView.P3}*/}
      {/*        className={clsx(styles.detailsValue, styles.overallInvestmentValue)}*/}
      {/*      >*/}
      {/*        ${formatUserMoney(overallVaultInvestment)}*/}
      {/*      </Text>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};
