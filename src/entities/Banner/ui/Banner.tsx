import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView, Text, TextView } from '@/shared/ui';

import { BannerColor, BannerSize, BannerViewType } from '../const';

import styles from './Banner.module.scss';

type BannerProps = {
  Title: React.ReactNode | string;
  description?: string;
  Button?: React.ReactNode;
  caption?: string;
  captionType?: LinkView;
  color?: BannerColor;
  viewType?: BannerViewType;
  size?: BannerSize;
  captionHref?: string;
  captionTarget?: string;
};

export const Banner: ComponentWithProps<BannerProps> = ({
  Title,
  description,
  Button,
  caption,
  captionType = LinkView.Link,
  viewType = BannerViewType.Desktop,
  color = BannerColor.Dark,
  size = BannerSize.Big,
  captionHref,
  captionTarget,
  className,
}) => {
  const title =
    typeof Title === 'string' ? (
      <Text textView={TextView.H3} className={styles.title}>
        {Title}
      </Text>
    ) : (
      Title
    );

  return (
    <div className={clsx(styles.root, styles[viewType], styles[color], styles[size], className)}>
      {title}
      {description && (
        <Text textView={TextView.P3} className={styles.description}>
          {description}
        </Text>
      )}
      <div className={styles.buttonContainer}>{Button}</div>
      {caption && (
        <Link
          className={styles.caption}
          viewType={captionType}
          href={captionHref}
          target={captionTarget}
        >
          {caption}
        </Link>
      )}
    </div>
  );
};
