'use client';

import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { TrustScoreBanner } from '@/entities/TrustScoreBanner';
import { QueryKey } from '@/shared/const/queryKey';
import {
  ComponentWithProps,
  HistoryTrustScoreResponse,
  useGetVaultHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import { Text, TextView, TrustScoreDescription } from '@/shared/ui';

import ArrowIcon from '../assets/icons/arrow.svg';

import styles from './SafetyScoreDetails.module.scss';

type SafetyScoreDetailsProps = {
  inspector: string;
  trustScore: number;
  vaultId: number;
};

export const SafetyScoreDetails: ComponentWithProps<SafetyScoreDetailsProps> = ({
  inspector,
  trustScore,
  vaultId,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const { data } = useGetVaultHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(vaultId, {
    query: { queryKey: [QueryKey.TrustScoreDetails, vaultId] },
  });

  const trustScoreDetails = (data as { data: HistoryTrustScoreResponse })?.data?.data;

  if (!trustScoreDetails) {
    return 'Error...';
  }

  return (
    <section className={clsx(styles.root, isOpened && styles.opened, className)}>
      <Text className={styles.heading} textView={TextView.H3}>
        Safety Score Details
      </Text>
      <div className={styles.container}>
        <TrustScoreBanner
          trustScoreValue={trustScore}
          className={styles.trustScoreBanner}
          inspector={inspector}
        />
        <div className={styles.trustScoreBreakdown}>
          {trustScoreDetails.map(detail => (
            <TrustScoreDescription details={detail} key={detail.name} />
          ))}
        </div>
        <HowTrustScoreCountsButton
          className={clsx(styles.tooltip, styles.tooltipMobile)}
          viewType={HowTrustScoreCountsButtonViewType.Button}
          hasIcon
        />
        <button className={styles.dropdownButton} onClick={() => setIsOpened(prev => !prev)}>
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
};
