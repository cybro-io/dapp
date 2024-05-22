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
  textClassName?: string;
};

export const Link: ComponentWithProps<LinkProps> = ({
  viewType = LinkView.Link,
  className,
  tooltipContent,
  href,
  textClassName,
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
        <Tooltip
          className={clsx(styles.contentContainer)}
          content={tooltipContent || 'Some content'}
        >
          <div className={clsx(styles.tooltipContainer, className)}>
            <p className={clsx(styles.tooltipText, textClassName)}>{children}</p>
            <InfoIcon />
          </div>
        </Tooltip>
      );
  }
};
