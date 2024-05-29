'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { AvailableFunds } from '@/entities/AvailableFunds';
import { VaultStats } from '@/entities/VaultStats';
import TetherIcon from '@/shared/assets/icons/tether.svg';
import TetherTronIcon from '@/shared/assets/icons/tetherTron.svg';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  Chip,
  Link,
  LinkView,
  Text,
  TextView,
  TrustScore,
} from '@/shared/ui';
import { TrustScoreViewType } from '@/shared/ui/baseComponents/TrustScore/const';
import { formatMoney } from '@/shared/utils';
import { AvailableVaults } from '@/widgets/AvailableVaults';

import styles from './Vault.module.scss';

type VaultProps = {};

export const Vault: ComponentWithProps<VaultProps> = ({ className }) => {
  const { isConnected } = useWeb3ModalAccount();
  const { erc20Balance } = useBalances();

  return (
    <Link className={clsx(styles.link)} href={'/vaults/1'}>
      <div className={clsx(styles.root, className)}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.iconContainer}>
              <TetherTronIcon />
            </div>
            <Text textView={TextView.H4} className={styles.titleText}>
              Stable Growth USDC Vault
            </Text>
          </div>
          <div className={styles.chipsContainer}>
            <Chip className={styles.chip}>Low Risk</Chip>
            <Chip className={styles.chip}>Low Risk</Chip>
          </div>
        </div>
        {isConnected && erc20Balance && <AvailableFunds balance={erc20Balance} />}
        <VaultStats weeklyApy={'999,5'} cybroPoints={'20'} tvl={'1’100k'} provider={'Details'} />
        <div className={styles.trustScoreContainer}>
          <TrustScore className={styles.trustScoreMobile} />
          <TrustScore className={styles.trustScoreDesktop} viewType={TrustScoreViewType.Desktop} />
          <Link viewType={LinkView.Tooltip}>How trust score counts</Link>
        </div>
      </div>
    </Link>
  );
};
