'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import Image from 'next/image';

import { AvailableFunds } from '@/entities/AvailableFunds';
import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { VaultStats } from '@/entities/VaultStats';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps, Money, VaultsResponseData } from '@/shared/types';
import { Chip, Link, Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';
import { getUserBalanceForVault, isInvalid, VaultCurrency } from '@/shared/utils';

import styles from './Vault.module.scss';

type VaultProps = {
  vault: VaultsResponseData;
};

export const Vault: ComponentWithProps<VaultProps> = ({ vault, className }) => {
  const { isConnected } = useWeb3ModalAccount();
  // const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  // const [balance, setBalance] = React.useState<Money>();
  const currency = vault.token.name as VaultCurrency;

  // React.useEffect(() => {
  //   const balance = getUserBalanceForVault(currency, usdbBalance, wethBalance, wbtcBalance);
  //   setBalance(balance);
  // }, [usdbBalance, wethBalance, wbtcBalance, currency]);

  return (
    <Link className={clsx(styles.link)} href={`/vaults/${vault.id}`}>
      <div className={clsx(styles.root, className)}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.iconContainer}>
              <Image src={vault.icon} alt={''} width={40} height={40} />
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
        {/*{isConnected && !isInvalid(balance) && (*/}
        {/*  <AvailableFunds tokenIcon={vault.icon} balance={balance} deposit={vault.balance} />*/}
        {/*)}*/}
        <VaultStats apy={vault.apy} cybroPoints={'20'} tvl={vault.tvl} provider={vault.provider} />
        <div className={styles.trustScoreContainer}>
          <TrustScore value={vault.trust_score} className={styles.trustScoreMobile} />
          <TrustScore
            value={vault.trust_score}
            className={styles.trustScoreDesktop}
            viewType={TrustScoreViewType.Desktop}
          />
          <HowTrustScoreCountsButton
            className={styles.howCountsDesktop}
            viewType={HowTrustScoreCountsButtonViewType.Tooltip}
          />
          <HowTrustScoreCountsButton
            className={styles.howCountsMobile}
            viewType={HowTrustScoreCountsButtonViewType.Button}
          />
        </div>
      </div>
    </Link>
  );
};
