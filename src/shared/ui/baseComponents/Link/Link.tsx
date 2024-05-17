'use client';

import React from 'react';

import { Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { default as NextLink } from 'next/link';

import InfoIcon from '@/shared/assets/icons/info.svg';
import { ComponentWithProps } from '@/shared/types';
import { LinkView } from '@/shared/ui';

import styles from './Link.module.scss';

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  tooltipContent?: React.ReactNode;
  viewType?: LinkView;
};

export const Link: ComponentWithProps<LinkProps> = ({
  viewType = LinkView.Link,
  className,
  tooltipContent,
  href,
  children,
}) => {
  switch (viewType) {
    case LinkView.Link:
      return (
        <NextLink className={clsx(styles.text, className)} href={href || ''}>
          {children}
        </NextLink>
      );

    case LinkView.Tooltip:
      return (
        <Tooltip className={styles.contentContainer} content={tooltipContent}>
          <div className={styles.tooltipContainer}>
            <p className={clsx(styles.tooltipText, className)}>{children}</p>
            <InfoIcon />
          </div>
        </Tooltip>
      );
  }
};
