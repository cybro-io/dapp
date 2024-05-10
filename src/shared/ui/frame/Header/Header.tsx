import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './Header.module.scss';

type HeaderProps = {};

export const Header: ComponentWithProps<HeaderProps> = ({ className }) => {
  return <header className={clsx(styles.root, className)}>Header</header>;
};
