import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView, Text, TextView } from '@/shared/ui';

import { BannerSize, BannerViewType } from '../const';

import styles from './Banner.module.scss';

type BannerProps = {
  Title: React.ReactNode | string;
  description?: string;
  Button: React.ReactNode;
  caption?: string;
  captionType?: LinkView;
  viewType?: BannerViewType;
  size?: BannerSize;
};

export const Banner: ComponentWithProps<BannerProps> = ({
  Title,
  description,
  Button,
  caption,
  captionType = LinkView.Link,
  viewType = BannerViewType.Dark,
  size = BannerSize.Big,
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
    <div className={clsx(styles.root, styles[viewType], styles[size], className)}>
      {title}
      {description && (
        <Text textView={TextView.P3} className={styles.description}>
          {description}
        </Text>
      )}
      {Button}
      {caption && (
        <Link className={styles.caption} viewType={captionType}>
          {caption}
        </Link>
      )}
    </div>
  );
};
