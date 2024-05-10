import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './Button.module.scss';
import { ButtonSize, ButtonView } from './const';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  view?: ButtonView;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: ComponentWithProps<ButtonProps> = ({
  children,
  onClick,
  view = ButtonView.Primary,
  size = ButtonSize.Medium,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.root, styles[view], styles[size], className)}
      onClick={onClick}
      {...props}
    >
      {!!startIcon && <div className={styles.iconContainer}>{startIcon}</div>}
      <span>{children}</span>
      {!!endIcon && <div className={styles.iconContainer}>{endIcon}</div>}
    </button>
  );
};
