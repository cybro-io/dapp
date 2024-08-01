'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { InfoBox, InfoBoxActionType, InfoBoxViewType, Text, TextView } from '@/shared/ui';

import TokenIcon from '../assets/icons/Avalance.svg';
import VaultsIcon from '../assets/icons/vaults.svg';

import styles from './MyVaultsInfo.module.scss';

type ApyInfoProps = {
  viewType?: InfoBoxViewType;
};

export const MyVaultsInfo: ComponentWithProps<ApyInfoProps> = ({
  viewType = InfoBoxViewType.Mobile,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const dropdownItems = [
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
    <div className={styles.dropdownItem} key={0}>
      <div className={styles.iconContainer}>
        <TokenIcon />
      </div>
      <div className={styles.contentContainer}>
        <Text textView={TextView.P3} className={styles.title}>
          Stable Growth USDC Vault
        </Text>
        <Text textView={TextView.C4} className={styles.value}>
          $1’100K
        </Text>
      </div>
    </div>,
  ];

  return (
    <InfoBox
      icon={<VaultsIcon />}
      title={'My vaults'}
      value={'4'}
      isOpened={isOpened}
      setIsOpened={() => setIsOpened(prev => !prev)}
      viewType={viewType}
      actionType={InfoBoxActionType.Dropdown}
      className={className}
      dropdownItems={dropdownItems}
    />
  );
};
