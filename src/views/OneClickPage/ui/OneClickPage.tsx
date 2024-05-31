import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, Text, TextView } from '@/shared/ui';

import styles from './OneClickPage.module.scss';

type OneClickPageProps = {};

export const OneClickPage: ComponentWithProps<OneClickPageProps> = ({ className }) => {
  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.left}>
        <Text className={styles.title} textView={TextView.H2}>
          <span className={styles.accent}>One-Click</span> Investing
        </Text>
        <div className={styles.imageContainerMobile}>
          <Image src={'/oneClickBg.png'} alt={''} height={264} width={375} />
        </div>
        <Text className={styles.subtitle} textView={TextView.H3}>
          Coming&nbsp;Soon This&nbsp;Year
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          Get hyped for our upcoming One-Click Investing feature! We're cooking up some awesome,
          user-friendly strategies to help you invest in our Pools and Vaults like a pro.
        </Text>
        <Text className={styles.joinUs}>
          <span className={styles.accent}>Join our waiting list now </span>
          and be the first to know when we launch. Just drop your email below, and we'll give you a
          heads up when it's go-time.
        </Text>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainerDesktop}>
          <Image src={'/oneClickBgDesktop.png'} alt={''} height={530} width={620} />
        </div>
        <div className={styles.formContainer}>
          <input className={styles.input} placeholder="Your email here" type="email" />
          <Button className={styles.submitButton} size={ButtonSize.Large}>
            Count me in
          </Button>
        </div>
        <Text className={styles.caption} textView={TextView.C3}>
          <span className={styles.bold}>No spam.</span> Only updates and release announcements.
        </Text>
      </div>
    </section>
  );
};
