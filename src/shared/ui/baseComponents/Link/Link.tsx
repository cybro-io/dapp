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
  onClick?: () => void;
  textClassName?: string;
  tooltipClassName?: string;
  onTooltipChange?: (isOpen: boolean) => void;
};

export const Link: ComponentWithProps<LinkProps> = ({
  viewType = LinkView.Link,
  className,
  tooltipContent,
  href,
  textClassName,
  tooltipClassName,
  onClick,
  onTooltipChange,
  children,
}) => {
  switch (viewType) {
    case LinkView.Link:
      return (
        <NextLink className={clsx(styles.text, className)} href={href || ''}>
          {children}
        </NextLink>
      );

    case LinkView.Button:
      return (
        <button className={clsx(styles.button, className)} onClick={onClick}>
          {children}
        </button>
      );

    case LinkView.Tooltip:
      return (
        <Tooltip
          className={clsx(styles.contentContainer, tooltipClassName)}
          content={tooltipContent || 'Some content'}
          onOpenChange={onTooltipChange}
        >
          <div className={clsx(styles.tooltipContainer, className)}>
            <p className={clsx(styles.tooltipText, textClassName)}>{children}</p>
            <div>
              <InfoIcon />
            </div>
          </div>
        </Tooltip>
      );
  }
};
