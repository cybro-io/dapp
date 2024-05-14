import React from 'react';

import { SwitchProps } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './ToggleSwitch.module.scss';

type ToggleSwitchProps = {
  test?: string;
} & SwitchProps;

export const ToggleSwitch: ComponentWithProps<ToggleSwitchProps> = ({
  test,
  className,
  ...props
}) => {
  return <Switch className={clsx(className)} {...props} />;
};
