'use client';
import React, { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';

import { ComponentWithProps, SortValue, VaultsResponseData } from '@/shared/types';
import { Chip, Loader, Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';

import DownIcon from '../../../assets/icons/down.svg';
import UpIcon from '../../../assets/icons/up.svg';

import styles from './AvailableVaultsList.module.scss';

type AvailableVaultsGridProps = {
  vaults: VaultsResponseData[];
  skeletons: number[];
  sort: [SortValue, boolean]; // Receive sort state as prop
  setSort: Dispatch<SetStateAction<[SortValue, boolean]>>;
  balance: Record<string, number>;
  isConnected: boolean;
  isLoading: boolean;
};

enum Sort {
  Descending = 'descending',
  Ascending = 'ascending',
  Default = 'default',
}

const headers = [
  {
    title: 'Vault Name',
    sortName: SortValue.name,
  },
  {
    title: 'Assets',
  },
  {
    title: 'APY',
    sortName: SortValue.apy,
  },
  {
    title: 'Vault TVL',
    sortName: SortValue.tvl,
  },
  {
    title: 'Provider',
    sortName: SortValue.provider,
  },
  {
    title: 'Trust Score',
    sortName: SortValue.trust_score,
  },
];

export const AvailableVaultsList: ComponentWithProps<AvailableVaultsGridProps> = ({
  vaults,
  sort,
  setSort,
  skeletons,
  balance,
  isConnected,
  isLoading,
  className,
}) => {
  const [currentSort, setCurrentSort] = React.useState<{
    column: SortValue | null;
    direction: Sort;
  }>({
    column: sort[0], // Initialize with current sort column
    direction: sort[1] ? Sort.Ascending : Sort.Descending, // Initialize with current sort direction
  });

  const getSortIcons = React.useCallback((sort: Sort) => {
    switch (sort) {
      case Sort.Default:
        return (
          <React.Fragment>
            <UpIcon />
            <DownIcon />
          </React.Fragment>
        );
      case Sort.Descending:
        return <DownIcon />;
      case Sort.Ascending:
        return <UpIcon />;
    }
  }, []);

  const handleSort = React.useCallback(
    (sortName: SortValue) => {
      setCurrentSort(prevState => {
        if (prevState.column !== sortName) {
          setSort([sortName, true]);
          return { column: sortName, direction: Sort.Ascending };
        }

        let newDirection;
        if (prevState.direction === Sort.Default) {
          newDirection = Sort.Ascending;
        } else if (prevState.direction === Sort.Ascending) {
          newDirection = Sort.Descending;
        } else {
          newDirection = Sort.Default;
        }

        setSort([sortName, newDirection === Sort.Ascending]);
        return { column: sortName, direction: newDirection };
      });
    },
    [setSort],
  );

  React.useEffect(() => {
    // Update local state when sort prop changes
    setCurrentSort({
      column: sort[0],
      direction: sort[1] ? Sort.Ascending : Sort.Descending,
    });
  }, [sort]);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          {headers.map(header => {
            if (!header.sortName) {
              return (
                <div key={header.title} className={styles.tableCell}>
                  {header.title}
                </div>
              );
            }

            return (
              <button
                key={header.title}
                className={styles.tableCell}
                onClick={() => handleSort(header.sortName)}
              >
                {header.title}
                <div className={styles.sortButtonsContainer}>
                  {getSortIcons(
                    currentSort.column === header.sortName ? currentSort.direction : Sort.Default,
                  )}
                </div>
              </button>
            );
          })}
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
