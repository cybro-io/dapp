'use client';
import React, { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';

import { ComponentWithProps, VaultsResponseData } from '@/shared/types';
import { Chip, Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';

import DownIcon from '../../../assets/icons/down.svg';
import UpIcon from '../../../assets/icons/up.svg';

import styles from './AvailableVaultsList.module.scss';

type AvailableVaultsGridProps = {
  vaults: VaultsResponseData[];
  skeletons: number[];
  balance: Record<string, number>;
  isConnected: boolean;
  isLoading: boolean;
};

enum Sort {
  Down = 'down',
  Up = 'up',
  Default = 'default',
}

export const AvailableVaultsList: ComponentWithProps<AvailableVaultsGridProps> = ({
  vaults,
  skeletons,
  balance,
  isConnected,
  isLoading,
  className,
}) => {
  const [vaultNameSort, setVaultNameSort] = React.useState<Sort>(Sort.Default);
  const [apySort, setApySort] = React.useState<Sort>(Sort.Default);
  const [tvlSort, setTvlSort] = React.useState<Sort>(Sort.Default);
  const [providerSort, setProviderSort] = React.useState<Sort>(Sort.Default);
  const [trustScoreSort, setTrustScoreSort] = React.useState<Sort>(Sort.Default);

  const getSortIcons = React.useCallback((sort: Sort) => {
    switch (sort) {
      case Sort.Default:
        return (
          <React.Fragment>
            <UpIcon />
            <DownIcon />
          </React.Fragment>
        );
      case Sort.Down:
        return <DownIcon />;
      case Sort.Up:
        return <UpIcon />;
    }
  }, []);

  const handleSort = React.useCallback((setSort: Dispatch<SetStateAction<Sort>>) => {
    setSort(prevState => {
      if (prevState === Sort.Default) {
        return Sort.Up;
      }

      if (prevState === Sort.Up) {
        return Sort.Down;
      }

      return Sort.Default;
    });
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <button className={styles.tableCell} onClick={() => handleSort(setVaultNameSort)}>
            Vault Name
            <div className={styles.sortButtonsContainer}>{getSortIcons(vaultNameSort)}</div>
          </button>
          <div className={styles.tableCell}>Assets</div>
          <button className={styles.tableCell} onClick={() => handleSort(setApySort)}>
            Weekly APY
            <div className={styles.sortButtonsContainer}>{getSortIcons(apySort)}</div>
          </button>
          <button className={styles.tableCell} onClick={() => handleSort(setTvlSort)}>
            Vault TVL
            <div className={styles.sortButtonsContainer}>{getSortIcons(tvlSort)}</div>
          </button>
          <button className={styles.tableCell} onClick={() => handleSort(setProviderSort)}>
            Provider
            <div className={styles.sortButtonsContainer}>{getSortIcons(providerSort)}</div>
          </button>
          <button className={styles.tableCell} onClick={() => handleSort(setTrustScoreSort)}>
            Trust Score
            <div className={styles.sortButtonsContainer}>{getSortIcons(trustScoreSort)}</div>
          </button>
        </div>
        {vaults.map((vault, index) => (
          <Link
            className={clsx(styles.tableRow, index % 2 === 0 && styles.dark)}
            href={`/vaults/${vault.id}`}
            key={vault.id}
          >
            <div className={clsx(styles.tableCell, styles.vaultNameCell)}>
              <Text className={styles.vaultName} textView={TextView.H5}>
                {vault.name}
              </Text>
              <div className={styles.chips}>
                {vault.badges.map((badge, index) => (
                  <Chip className={styles.chip} key={badge}>
                    {badge}
                  </Chip>
                ))}
              </div>
            </div>
            <div className={clsx(styles.tableCell, styles.assetsCell)}>
              <div className={styles.assetTokenContainer}>
                <Image src={vault.icon} width={30} height={30} alt={''} />
              </div>
              {vault.token.name}
            </div>
            <div className={clsx(styles.tableCell, styles.apyCell)}>{vault.apy}%</div>
            <div className={clsx(styles.tableCell, styles.tvlCell)}>
              {numeral(Math.floor(Number(vault.tvl))).format('0.0a')}
            </div>
            <div className={clsx(styles.tableCell, styles.providerCell)}>{vault.provider}</div>
            <div className={clsx(styles.tableCell, styles.trustScoreCell)}>
              <TrustScore value={vault.trust_score} viewType={TrustScoreViewType.Small} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
