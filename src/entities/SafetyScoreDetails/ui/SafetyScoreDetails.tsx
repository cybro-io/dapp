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
  Nullable,
  useGetVaultHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import { SafetyScoreDetailsSkeleton, Text, TextView, TrustScoreDescription } from '@/shared/ui';

import ArrowIcon from '../assets/icons/arrow.svg';

import styles from './SafetyScoreDetails.module.scss';

type SafetyScoreDetailsProps = {
  inspector: Nullable<string>;
  trustScore: Nullable<number>;
  vaultId: Nullable<number>;
  isLoading?: boolean;
};

export const SafetyScoreDetails: ComponentWithProps<SafetyScoreDetailsProps> = ({
  inspector,
  trustScore,
  vaultId,
  isLoading = false,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const { data, isLoading: isDataLoading } =
    useGetVaultHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(vaultId as number, {
      query: { queryKey: [QueryKey.TrustScoreDetails, vaultId] },
    });

  const trustScoreDetails = data?.data?.data;

  if (isLoading || isDataLoading || !trustScoreDetails) {
    return <SafetyScoreDetailsSkeleton />;
  }

  return (
    <section className={clsx(styles.root, isOpened && styles.opened, className)}>
      <Text className={styles.heading} textView={TextView.H3}>
        Safety Score Details
      </Text>
      <div className={styles.container}>
        {!!trustScore && inspector && (
          <TrustScoreBanner
            trustScoreValue={trustScore}
            className={styles.trustScoreBanner}
            inspector={inspector}
          />
        )}
        <div className={styles.trustScoreBreakdown}>
          <div className={styles.breakdownSection}>
            <Text className={styles.breakdownSectionTitle} textView={TextView.H4}>
              Protocol
            </Text>
            {trustScoreDetails.slice(0, 5).map((detail, index) => (
              <TrustScoreDescription
                className={styles.trustDescription}
                details={detail}
                key={index}
              />
            ))}
          </div>
          <div className={styles.breakdownSection}>
            <Text className={styles.breakdownSectionTitle} textView={TextView.H4}>
              Pool
            </Text>
            {trustScoreDetails.slice(5, 9).map((detail, index) => (
              <TrustScoreDescription
                className={styles.trustDescription}
                details={detail}
                key={index}
              />
            ))}
          </div>
          <div className={styles.breakdownSection}>
            <Text className={styles.breakdownSectionTitle} textView={TextView.H4}>
              Asset
            </Text>
            {trustScoreDetails.slice(10, 12).map((detail, index) => (
              <TrustScoreDescription
                className={styles.trustDescription}
                details={detail}
                key={index}
              />
            ))}
          </div>
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
