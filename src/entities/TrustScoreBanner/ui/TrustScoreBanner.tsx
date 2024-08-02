import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { ComponentWithProps } from '@/shared/types';
import { Chip, Text, TextView, TrustScore } from '@/shared/ui';

import AuditorIcon from '../assets/icons/auditor.svg';
import ShieldIcon from '../assets/icons/shield.svg';

import styles from './TrustScoreBanner.module.scss';

type TrustScoreBannerProps = {
  inspector: string;
  trustScoreValue: number;
  isBordered?: boolean;
};

export const TrustScoreBanner: ComponentWithProps<TrustScoreBannerProps> = ({
  inspector,
  trustScoreValue,
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
        <TrustScore
          value={trustScoreValue}
          className={clsx(styles.trustScore, styles.trustScoreMobile)}
        />
        <TrustScore
          value={trustScoreValue}
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
          <Text textView={TextView.C1} className={styles.auditedBy}>
            <ShieldIcon />
            Audited by
          </Text>
          <div className={styles.auditor}>
            <AuditorIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
