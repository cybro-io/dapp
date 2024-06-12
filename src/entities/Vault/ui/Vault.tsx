'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { AvailableFunds } from '@/entities/AvailableFunds';
import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { VaultStats } from '@/entities/VaultStats';
import TetherTronIcon from '@/shared/assets/icons/tetherTron.svg';
import { useBalances } from '@/shared/hooks';
import { useVault } from '@/shared/hooks/vault';
import { ComponentWithProps, Money } from '@/shared/types';
import { Chip, Link, Text, TextView, TrustScore } from '@/shared/ui';
import { TrustScoreViewType } from '@/shared/ui';
import { getRandomVault, getUserBalanceForVault, getVaultTitle, VaultType } from '@/shared/utils';

import styles from './Vault.module.scss';

type VaultProps = {};

export const Vault: ComponentWithProps<VaultProps> = ({ className }) => {
  const { isConnected } = useWeb3ModalAccount();
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();

  ///////// MOCK /////////
  const [vaultType, setVaultType] = React.useState<VaultType>();
  const [title, setTitle] = React.useState<string>();
  const [balance, setBalance] = React.useState<Money>();

  React.useEffect(() => {
    const vaultType = getRandomVault();
    setVaultType(vaultType);

    const title = getVaultTitle(vaultType);
    setTitle(title);

    const balance = getUserBalanceForVault(vaultType, usdbBalance, wethBalance, wbtcBalance);
    setBalance(balance);
  }, [usdbBalance, wethBalance, wbtcBalance]);

  const { totalAssets, userDeposit } = useVault(vaultType);
  //////////////////

  return (
    <Link className={clsx(styles.link)} href={`/vaults/1?type=${vaultType}`}>
      <div className={clsx(styles.root, className)}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.iconContainer}>
              <TetherTronIcon />
            </div>
            <Text textView={TextView.H4} className={styles.titleText}>
              {title}
            </Text>
          </div>
          <div className={styles.chipsContainer}>
            <Chip className={styles.chip}>Low Risk</Chip>
            <Chip className={styles.chip}>Low Risk</Chip>
          </div>
        </div>
        {isConnected && balance && <AvailableFunds balance={balance} deposit={userDeposit} />}
        <VaultStats weeklyApy={'999,5'} cybroPoints={'20'} tvl={totalAssets} provider={'Details'} />
        <div className={styles.trustScoreContainer}>
          <TrustScore className={styles.trustScoreMobile} />
          <TrustScore className={styles.trustScoreDesktop} viewType={TrustScoreViewType.Desktop} />
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
