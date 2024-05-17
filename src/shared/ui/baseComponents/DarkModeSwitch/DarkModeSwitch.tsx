'use client';

import React from 'react';

import clsx from 'clsx';

import DarkIcon from '@/shared/assets/icons/moon-outline.svg';
import LightIcon from '@/shared/assets/icons/sun-outline.svg';
import { ComponentWithProps } from '@/shared/types';
import { ToggleSwitch } from '@/shared/ui';

import styles from './DarkModeSwitch.module.scss';

type DarkModeSwitchProps = {};

export const DarkModeSwitch: ComponentWithProps<DarkModeSwitchProps> = ({ className }) => {
  return (
    <ToggleSwitch
      className={clsx(styles.root, className)}
      size={'lg'}
      color={'default'}
      startContent={
        <p>
          <DarkIcon height={20} width={20} />
        </p>
      }
      endContent={
        <p>
          <LightIcon height={20} width={20} />
        </p>
      }
    />
  );
};
