import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps } from '@/shared/types';
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
        <div className={styles.logoBottomContainer}>
          <Image className={styles.logoBottom} src={'CybroBg.svg'} alt={'Cybro Logo, black'} fill />
        </div>
      </main>
      <Footer className={styles.footer} />
    </React.Fragment>
  );
};
