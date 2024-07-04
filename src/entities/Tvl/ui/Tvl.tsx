'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps, useGetTvlApiV1CommonTvlGet } from '@/shared/types';
import { Chip, ChipViewType, TvlSkeleton } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './Tvl.module.scss';

type TvlProps = {};

export const Tvl: ComponentWithProps<TvlProps> = ({ className }) => {
  const { data, isLoading } = useGetTvlApiV1CommonTvlGet();
  // @ts-ignore
  const tvl = data?.data?.data?.tvl as string;

  if (isLoading) {
    return <TvlSkeleton />;
  }

  return (
    <Chip viewType={ChipViewType.Outlined} className={clsx(styles.root, className)}>
      Cybro TVL ${formatUserMoney(tvl)}
    </Chip>
  );
};
