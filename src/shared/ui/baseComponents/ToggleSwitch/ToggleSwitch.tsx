import React from 'react';

import { SwitchProps } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './ToggleSwitch.module.scss';

type ToggleSwitchProps = {} & SwitchProps;

export const ToggleSwitch: ComponentWithProps<ToggleSwitchProps> = ({ className, ...props }) => {
  return <Switch className={clsx(styles.root, className)} {...props} />;
};
