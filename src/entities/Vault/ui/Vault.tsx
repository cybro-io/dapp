'use client';

import React from 'react';

import clsx from 'clsx';

import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Link, LinkView, Text, TrustScore } from '@/shared/ui';

import styles from './Vault.module.scss';

type VaultProps = {};

export const Vault: ComponentWithProps<VaultProps> = props => {
  return (
    <div className={clsx(styles.root)}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <div>
            <TetherIcon />
          </div>
          <Text className={styles.titleText}>Stable Growth USDC Vault</Text>
        </div>
        <div className={styles.chipsContainer}>
          <Chip>Low Risk</Chip>
          <Chip>Low Risk</Chip>
        </div>
      </div>
      <div className={styles.details}>
        <div className={clsx(styles.detailsTop, styles.detailsSection)}>
          <div className={styles.detailsItem}>
            <p className={styles.detailsTitle}>Weekly APY</p>
            <p className={styles.detailsValue}>999,5%</p>
          </div>
          <div className={styles.detailsItem}>
            <Link viewType={LinkView.Tooltip} className={styles.detailsTitle}>
              Cybro Points
            </Link>
            <p className={styles.detailsValue}>20%</p>
          </div>
        </div>
        <div className={clsx(styles.detailsBottom, styles.detailsSection)}>
          <div className={styles.detailsItem}>
            <p className={styles.detailsTitle}>TVL</p>
            <p className={styles.detailsValue}>$1’100k</p>
          </div>
          <div className={styles.detailsItem}>
            <p className={styles.detailsTitle}>Provider</p>
            <Chip>Details</Chip>
          </div>
        </div>
      </div>
      <TrustScore />
      <Link viewType={LinkView.Tooltip}>How trust score counts</Link>
    </div>
  );
};
