import React, { ReactElement } from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView, Text } from '@/shared/ui';

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
  const title = typeof Title === 'string' ? <Text className={styles.title}>{Title}</Text> : Title;

  return (
    <div className={clsx(styles.root, styles[viewType], styles[size], className)}>
      {title}
      {description && <Text className={styles.description}>{description}</Text>}
      {Button}
      {caption && <Link viewType={captionType}>{caption}</Link>}
    </div>
  );
};
