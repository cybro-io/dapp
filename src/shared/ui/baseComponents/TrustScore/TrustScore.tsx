'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text } from '@/shared/ui';

import DangerIcon from './assets/danger.svg';
import styles from './TrustScore.module.scss';

type TrustScoreProps = {};

export const TrustScore: ComponentWithProps<TrustScoreProps> = props => {
  return (
    <div className={clsx(styles.root)}>
      <div>
        <DangerIcon />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Text className={styles.title}>Trust Score</Text>
          <Text>1.8</Text>
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
