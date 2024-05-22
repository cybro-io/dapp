'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import NegativeIcon from './assets/negative.svg';
import PositiveIcon from './assets/positive.svg';
import { TrustScoreVariant } from './const';
import styles from './TrustScoreDescription.module.scss';

type TrustScoreDescriptionProps = {
  title: string;
  description: string;
  variant?: TrustScoreVariant;
};

export const TrustScoreDescription: ComponentWithProps<TrustScoreDescriptionProps> = ({
  title,
  description,
  variant = TrustScoreVariant.Positive,
  className,
}) => {
  return (
    <div className={clsx(styles.root, styles[variant], className)}>
      <div className={styles.trustScoreRating}>
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        <div className={styles.cornerBottomRight} />
        <p className={styles.value}>2.5</p>
        <div className={styles.iconContainer}>
          {variant === TrustScoreVariant.Negative ? <NegativeIcon /> : <PositiveIcon />}
        </div>
      </div>
      <div className={styles.description}>
        <Text textView={TextView.H5}>{title}</Text>
        <Text className={styles.descriptionValue} textView={TextView.P3}>
          {description}
        </Text>
      </div>
    </div>
  );
};
