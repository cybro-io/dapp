import React from 'react';

import { SwitchProps } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './ToggleSwitch.module.scss';

type ToggleSwitchProps = {
  startContent: string;
  endContent: string;
} & SwitchProps;

export const ToggleSwitch: ComponentWithProps<ToggleSwitchProps> = ({
  startContent,
  endContent,
  className,
  ...props
}) => {
  return (
    <Switch
      classNames={{
        base: className,
        wrapper: clsx(styles.wrapper),
        thumb: clsx(styles.thumb),
      }}
      startContent={<span className={styles.switchContent}>{startContent}</span>}
      endContent={<span className={styles.switchContent}>{endContent}</span>}
      thumbIcon={({ isSelected }) =>
        !isSelected ? (
          <span className={clsx(styles.switchContent, styles.selected)}>{startContent}</span>
        ) : (
          <span className={clsx(styles.switchContent, styles.selected)}>{endContent}</span>
        )
      }
      {...props}
    />
  );
};
