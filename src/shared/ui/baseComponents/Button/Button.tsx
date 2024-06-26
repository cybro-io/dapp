import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './Button.module.scss';
import { ButtonSize, ButtonView } from './const';

type ButtonProps = {
  children: React.ReactNode;
  view?: ButtonView;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: any;
};

export const Button: ComponentWithProps<ButtonProps> = ({
  children,
  onClick,
  view = ButtonView.Primary,
  size = ButtonSize.Medium,
  startIcon,
  endIcon,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(styles.root, styles[view], styles[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {!!startIcon && <div className={styles.iconContainer}>{startIcon}</div>}
      <span>{children}</span>
      {!!endIcon && <div className={styles.iconContainer}>{endIcon}</div>}
    </button>
  );
};
