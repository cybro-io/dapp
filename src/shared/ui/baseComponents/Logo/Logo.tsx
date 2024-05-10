'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import LogoIcon from '@/shared/assets/icons/logo.svg';
import { ComponentWithProps } from '@/shared/types';

import styles from './Logo.module.scss';

type LogoProps = {};

export const Logo: ComponentWithProps<LogoProps> = props => {
  return (
    <Link href={'/'}>
      <LogoIcon />
    </Link>
  );
};
