import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Text, TextView, TrustScore } from '@/shared/ui';

import styles from './TrustScoreBanner.module.scss';

type TrustScoreBannerProps = {
  isBordered?: boolean;
};

export const TrustScoreBanner: ComponentWithProps<TrustScoreBannerProps> = ({
  isBordered = true,
  className,
}) => {
  return (
    <div className={clsx(styles.root, !isBordered && styles.notBordered, className)}>
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />
      <div className={styles.trustScoreLeft}>
        <TrustScore className={clsx(styles.trustScore, styles.trustScoreMobile)} />
        <TrustScore
          className={clsx(styles.trustScore, styles.trustScoreDesktop)}
          isBordered={false}
        />
        <HowTrustScoreCountsButton
          className={clsx(styles.tooltip)}
          viewType={HowTrustScoreCountsButtonViewType.Tooltip}
        />
      </div>
      <div className={styles.trustScoreRight}>
        <Text className={styles.vaultDescription} textView={TextView.P3}>
          This vault is rated with a moderate risk score due to its exposure to high-volatility
          assets. Safety measures include investments and real-time risk management.
        </Text>
        <div className={styles.inspectedContainer}>
          <Text textView={TextView.C1}>Inspected by</Text>
          <Chip>Cybro Guys</Chip>
        </div>
      </div>
    </div>
  );
};
