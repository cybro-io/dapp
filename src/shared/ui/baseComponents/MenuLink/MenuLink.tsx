'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ComponentWithProps } from '@/shared/types';

import styles from './MenuLink.module.scss';

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const MenuLink: ComponentWithProps<MenuLinkProps> = ({ href, className, children }) => {
  const pathname = usePathname();

  const isSelected = React.useMemo(() => pathname === href, []);

  return (
    <li className={clsx(styles.root, isSelected && styles.selected, className)}>
      <Link href={href}>{children}</Link>
    </li>
  );
};
