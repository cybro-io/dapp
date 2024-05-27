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
  isDisabled?: boolean;
  isComingSoon?: boolean;
};

export const MenuLink: ComponentWithProps<MenuLinkProps> = ({
  href,
  isDisabled = false,
  isComingSoon = false,
  className,
  children,
}) => {
  const pathname = usePathname();

  const isSelected = React.useMemo(() => pathname === href, []);

  const isLinkDisabled = isDisabled || isComingSoon;

  return (
    <Link
      className={clsx(
        styles.root,
        isSelected && styles.selected,
        isLinkDisabled && styles.disabled,
        className,
      )}
      href={href}
      onClick={e => isLinkDisabled && e.preventDefault()}
    >
      {isComingSoon && <p className={styles.comingSoonBanner}>Coming Soon</p>}
      {children}
    </Link>
  );
};
