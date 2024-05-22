import React from 'react';

import { Footer, Header } from '@/shared/ui';

import styles from './BaseLayout.module.scss';

type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
      </main>
      <Footer className={styles.footer} />
    </React.Fragment>
  );
};
