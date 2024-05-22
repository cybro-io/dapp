import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { ChipSize, ChipViewType } from '@/shared/ui';

import styles from './Chip.module.scss';

type ChipProps = {
  children: React.ReactNode;
  size?: ChipSize;
  viewType?: ChipViewType;
};

export const Chip: ComponentWithProps<ChipProps> = ({
  size = ChipSize.Small,
  viewType = ChipViewType.Default,
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.root, styles[size], styles[viewType], className)}>{children}</div>
  );
};
