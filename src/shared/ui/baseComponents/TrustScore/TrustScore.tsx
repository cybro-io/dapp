'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text } from '@/shared/ui';
import { TrustScoreViewType } from '@/shared/ui/baseComponents/TrustScore/const';

import DangerIcon from './assets/icons/danger.svg';
import styles from './TrustScore.module.scss';

type TrustScoreProps = {
  viewType?: TrustScoreViewType;
  isBordered?: boolean;
};

export const TrustScore: ComponentWithProps<TrustScoreProps> = ({
  isBordered = true,
  viewType = TrustScoreViewType.Mobile,
  className,
}) => {
  return (
    <div
      className={clsx(styles.root, !isBordered && styles.notBordered, styles[viewType], className)}
    >
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />
      <div className={styles.iconContainer}>
        <DangerIcon />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Text className={styles.title}>Trust Score</Text>
          <Text className={styles.value}>1.8</Text>
        </div>
        <div className={styles.progressBarContainer}>
          <div className={styles.pointer}></div>
          <div className={styles.progressBar}>
            <div className={clsx(styles.bar, styles.danger)}></div>
            <div className={clsx(styles.bar, styles.warning)}></div>
            <div className={clsx(styles.bar, styles.good)}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
