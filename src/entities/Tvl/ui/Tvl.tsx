import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Chip, ChipViewType } from '@/shared/ui';

import styles from './Tvl.module.scss';

type TvlProps = {
  children: React.ReactNode;
};

export const Tvl: ComponentWithProps<TvlProps> = ({ children, className }) => {
  return (
    <Chip viewType={ChipViewType.Outlined} className={clsx(styles.root, className)}>
      {children}
    </Chip>
  );
};
