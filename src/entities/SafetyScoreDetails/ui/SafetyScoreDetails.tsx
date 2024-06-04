'use client';

import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { TrustScoreBanner } from '@/entities/TrustScoreBanner';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView, TrustScoreDescription, TrustScoreVariant } from '@/shared/ui';

import ArrowIcon from '../assets/icons/arrow.svg';

import styles from './SafetyScoreDetails.module.scss';

type SafetyScoreDetailsProps = {};

export const SafetyScoreDetails: ComponentWithProps<SafetyScoreDetailsProps> = ({ className }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <section className={clsx(styles.root, isOpened && styles.opened, className)}>
      <Text className={styles.heading} textView={TextView.H3}>
        Safety Score Details
      </Text>
      <div className={styles.container}>
        <TrustScoreBanner className={styles.trustScoreBanner} />
        <div className={styles.trustScoreBreakdown}>
          <TrustScoreDescription
            title="Time-tested Protocol"
            description="A long operational history without major incidents increases trust"
            variant={TrustScoreVariant.Positive}
          />
          <TrustScoreDescription
            title="Liquidity Level"
            description="High level of liquidity minimizes the risk of market manipulation and ensures asset stability"
            variant={TrustScoreVariant.Positive}
          />
          <TrustScoreDescription
            title="Smart Contract Insurance"
            description="Insurance policies in place to protect against potential smart contract vulnerabilities"
            variant={TrustScoreVariant.Negative}
          />
          <TrustScoreDescription
            title="Regular Security Updates"
            description="Frequent updates to security measures to keep up with evolving threats"
            variant={TrustScoreVariant.Negative}
          />
        </div>
        <HowTrustScoreCountsButton
          className={clsx(styles.tooltip, styles.tooltipMobile)}
          viewType={HowTrustScoreCountsButtonViewType.Button}
          hasIcon={true}
        />
        <button className={styles.dropdownButton} onClick={() => setIsOpened(prev => !prev)}>
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
};
