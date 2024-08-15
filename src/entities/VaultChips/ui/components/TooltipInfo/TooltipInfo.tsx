import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { isEven } from '@/shared/utils';

import CircleIcon from '../../../assets/icons/base-icon.svg';

import styles from './TooltipInfo.module.scss';

type TooltipInfoProps = {
  chips: string[];
};

export const TooltipInfo: ComponentWithProps<TooltipInfoProps> = ({ chips, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Text className={styles.title} textView={TextView.C1}>
        Points
      </Text>
      <div className={styles.dataContainer}>
        {chips.map((chip, index) => {
          return (
            <div className={clsx(styles.chipItem, !isEven(index + 1) && styles.dark)} key={chip}>
              <Text className={styles.itemTitle} textView={TextView.C4}>
                <CircleIcon />
                {chip}
              </Text>
              {/*<Text className={styles.itemValue} textView={TextView.C4}>*/}
              {/*  15x*/}
              {/*</Text>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
};
