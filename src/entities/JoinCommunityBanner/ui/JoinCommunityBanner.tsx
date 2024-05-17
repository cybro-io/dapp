import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Socials, Text } from '@/shared/ui';

import styles from './JoinCommunityBanner.module.scss';

type JoinCommunityBannerProps = {};

export const JoinCommunityBanner: ComponentWithProps<JoinCommunityBannerProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <Text className={styles.heading}>
            Join the <span className={styles.highlight}>community</span>
          </Text>
          <Socials />
        </div>
      </div>
    </div>
  );
};
