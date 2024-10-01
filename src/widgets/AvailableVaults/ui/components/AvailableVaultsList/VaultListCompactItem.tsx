import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { VaultChips } from '@/entities/VaultChips';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import { Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';

import styles from './VaultListCompactItem.module.scss';

type VaultListCompactItemProps = {
  vault: VaultResponseData;
  index: number;
};

export const VaultListCompactItem: ComponentWithProps<
  VaultListCompactItemProps
> = ({ vault, index, className }) => {
  return (
    <Link
      className={clsx(styles.root, index % 2 === 0 && styles.dark, className)}
      href={`/vaults/${vault.id}`}
      key={vault.id}
    >
      <div className={styles.top}>
        <Text textView={TextView.P3}>{vault.name}</Text>
        <TrustScore
          className={styles.trustScore}
          value={vault.trust_score}
          viewType={TrustScoreViewType.Small}
        />
        <div className={styles.tokenIcon}>
          <Image src={vault.icon} width={24} height={24} alt={''} />
        </div>
      </div>
      <VaultStats
        className={styles.vaultStats}
        apy={vault.apy}
        cybroPoints={'20'}
        tvl={vault.tvl}
        provider={vault.provider.name}
        viewType={VaultStatsView.Card}
      />
      <VaultChips className={styles.chipsContainer} badges={vault.badges} />
    </Link>
  );
};
