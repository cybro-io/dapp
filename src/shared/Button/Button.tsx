import React from 'react';

import clsx from 'clsx';

import { ButtonSize, ButtonView } from '@/shared/Button/const';
import { ComponentWithProps } from '@/shared/types';

import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  view?: ButtonView;
  size?: ButtonSize;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const Button: ComponentWithProps<ButtonProps> = ({
  children,
  view = ButtonView.Primary,
  size = ButtonSize.Medium,
  disabled = false,
  startIcon,
  endIcon,
  className,
}) => {
  console.log(endIcon, 'endIcon');

  return (
    <button
      className={clsx(styles.root, styles[view], styles[size], className)}
      disabled={disabled}
    >
      {!!startIcon && <div className={styles.iconContainer}>{startIcon}</div>}
      <span>{children}</span>
      {!!endIcon && <div className={styles.iconContainer}>{endIcon}</div>}
    </button>
  );
};
