'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import LogoIcon from '@/shared/assets/icons/logo.svg';
import { ComponentWithProps } from '@/shared/types';

import styles from './Logo.module.scss';

type LogoProps = {
  height?: number;
  width?: number;
};

export const Logo: ComponentWithProps<LogoProps> = ({ height, width, className }) => {
  return (
    <Link className={clsx(styles.root, className)} href={'/'}>
      <LogoIcon height={height} width={width} />
    </Link>
  );
};
