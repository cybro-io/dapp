import React from 'react';

import clsx from 'clsx';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { ProfileStatsPopover } from '@/widgets/ProfileStatsPopover';

import styles from './BaseLayout.module.scss';

type BaseLayoutProps = {
  hasFooter?: boolean;
  children: React.ReactNode;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  hasFooter = true,
  children,
}) => {
  return (
    <React.Fragment>
      <Header
        className={styles.header}
        connectedComponent={<ProfileStatsPopover />}
      />
      <main className={clsx(styles.main, styles.noFooter)}>
        <div className={styles.mainContent}>{children}</div>
      </main>
      {hasFooter && <Footer className={styles.footer} />}
    </React.Fragment>
  );
};
