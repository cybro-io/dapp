'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import Image from 'next/image';

import { AvailableFunds } from '@/entities/AvailableFunds';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { ComponentWithProps, VaultsResponseData } from '@/shared/types';
import { Chip, Link, Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';
import { isInvalid } from '@/shared/utils';

import styles from './Vault.module.scss';

type VaultProps = {
  vault: VaultsResponseData;
  userBalance: number;
};

export const Vault: ComponentWithProps<VaultProps> = ({ vault, userBalance, className }) => {
  const { isConnected } = useWeb3ModalAccount();
  const [componentWidth, setComponentWidth] = React.useState<number>(0);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const updateWidth = () => {
    if (rootRef.current) {
      setComponentWidth(rootRef.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <Link className={clsx(styles.link)} href={`/vaults/${vault.id}`}>
      <div
        className={clsx(styles.root, componentWidth > 390 && styles.large, className)}
        ref={rootRef}
      >
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.tokenContainer}>
              <Image
                className={styles.tokenicon}
                src={vault.icon}
                alt={''}
                width={40}
                height={40}
              />
              <p className={styles.tokenName}>{vault.token.name}</p>
            </div>
            <Text textView={TextView.H4} className={styles.titleText}>
              {vault.name}
            </Text>
          </div>
          <div className={styles.chipsContainer}>
            {vault?.badges.slice(0, 3).map(badge => (
              <Chip className={styles.chip} key={badge}>
                {badge}
              </Chip>
            ))}
          </div>
        </div>
        {isConnected && !isInvalid(userBalance) && (
          <AvailableFunds
            tokenIcon={vault.icon}
            balance={userBalance}
            deposit={vault.balance_usd}
          />
        )}
        <VaultStats
          apy={vault.apy}
          cybroPoints={'20'}
          tvl={vault.tvl}
          provider={vault.provider}
          viewType={VaultStatsView.Card}
        />
        {/*<div className={styles.trustScoreContainer}>*/}
        <TrustScore value={vault.trust_score} className={styles.trustScore} />
        {/*<TrustScore*/}
        {/*  value={vault.trust_score}*/}
        {/*  className={styles.trustScoreDesktop}*/}
        {/*  viewType={TrustScoreViewType.Desktop}*/}
        {/*/>*/}
        {/*<HowTrustScoreCountsButton*/}
        {/*  className={styles.howCountsMobile}*/}
        {/*  viewType={HowTrustScoreCountsButtonViewType.Button}*/}
        {/*/>*/}
        {/*<HowTrustScoreCountsButton*/}
        {/*  className={styles.howCountsDesktop}*/}
        {/*  viewType={HowTrustScoreCountsButtonViewType.Tooltip}*/}
        {/*/>*/}
        {/*</div>*/}
      </div>
    </Link>
  );
};
