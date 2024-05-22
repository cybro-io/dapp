'use client';

import React from 'react';

import clsx from 'clsx';

import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Link, LinkView, Text, TextView, TrustScore } from '@/shared/ui';

import styles from './Vault.module.scss';

type VaultProps = {};

export const Vault: ComponentWithProps<VaultProps> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <div>
            <TetherIcon />
          </div>
          <Text textView={TextView.H4} className={styles.titleText}>
            Stable Growth USDC Vault
          </Text>
        </div>
        <div className={styles.chipsContainer}>
          <Chip>Low Risk</Chip>
          <Chip>Low Risk</Chip>
        </div>
      </div>
      <div className={styles.details}>
        <div className={clsx(styles.detailsTop, styles.detailsSection)}>
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Weekly APY
            </Text>
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.accentDetailsValue)}
            >
              999,5%
            </Text>
          </div>
          <div className={styles.detailsItem}>
            <Link viewType={LinkView.Tooltip} className={styles.detailsTitle}>
              Cybro Points
            </Link>
            <Text textView={TextView.P3} className={styles.detailsValue}>
              20%
            </Text>
          </div>
        </div>
        <div className={clsx(styles.detailsBottom, styles.detailsSection)}>
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              TVL
            </Text>
            <Text textView={TextView.P3} className={styles.detailsValue}>
              $1’100k
            </Text>
          </div>
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Provider
            </Text>
            <Chip>Details</Chip>
          </div>
        </div>
      </div>
      <TrustScore />
      <Link viewType={LinkView.Tooltip}>How trust score counts</Link>
    </div>
  );
};
