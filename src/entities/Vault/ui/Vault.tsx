'use client';

import React from 'react';

import clsx from 'clsx';

import { VaultStats } from '@/entities/VaultStats';
import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Link, LinkView, Text, TextView, TrustScore } from '@/shared/ui';

import styles from './Vault.module.scss';

type VaultProps = {};

export const Vault: ComponentWithProps<VaultProps> = ({ className }) => {
  return (
    <Link className={clsx(styles.link)} href={'/vaults/1'}>
      <div className={clsx(styles.root, className)}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.iconContainer}>
              <TetherIcon />
            </div>
            <Text textView={TextView.H4} className={styles.titleText}>
              Stable Growth USDC Vault
            </Text>
          </div>
          <div className={styles.chipsContainer}>
            <Chip className={styles.chip}>Low Risk</Chip>
            <Chip className={styles.chip}>Low Risk</Chip>
          </div>
        </div>
        <VaultStats weeklyApy={'999,5'} cybroPoints={'20'} tvl={'1’100k'} provider={'Details'} />
        <TrustScore />
        <Link viewType={LinkView.Tooltip}>How trust score counts</Link>
      </div>
    </Link>
  );
};
