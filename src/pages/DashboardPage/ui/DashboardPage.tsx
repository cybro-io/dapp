'use client';

import React from 'react';

import clsx from 'clsx';

import { Banner, BannerSize } from '@/entities/Banner';
import TetherIcon from '@/shared/assets/icons/tether.svg';
import { ComponentWithProps } from '@/shared/types';
import { Chip, ChipSize, Text, TextView } from '@/shared/ui';
import { VaultInfo } from '@/widgets/VaultInfo';
import { YieldCalculator } from '@/widgets/YieldCalculator';

import styles from './DashboardPage.module.scss';

type DashboardPageProps = {};

export const DashboardPage: ComponentWithProps<DashboardPageProps> = props => {
  return (
    <React.Fragment>
      <section className={clsx(styles.heroSection)}>
        <div className={styles.tetherContainer}>
          <TetherIcon />
        </div>
        <Text className={styles.heading} textView={TextView.H1}>
          <span className={clsx(styles.headingBackground, styles.headingBackgroundTop)}>
            <span className={styles.accent}>High Yield</span>
          </span>
          <br />
          <span className={styles.headingBackground}>BTC Strategy</span>
        </Text>
        <Text
          textView={TextView.P3}
          className={clsx(styles.desktopDescription, styles.description)}
        >
          The High Yield BTC Strategy vault is designed for investors seeking higher returns through
          dynamic management of Bitcoin assets. The strategy focuses on leveraging market trends and
          fluctuations to optimize performance
        </Text>
        <Text textView={TextView.P3} className={clsx(styles.mobileDescription, styles.description)}>
          Maximize your returns with strategic Bitcoin investments
        </Text>
        <div className={styles.chipsContainer}>
          <Chip className={styles.chip} size={ChipSize.Large}>
            Low Risk
          </Chip>
          <Chip className={styles.chip} size={ChipSize.Large}>
            Stablecoin
          </Chip>
        </div>
      </section>
      <div className={styles.main}>
        <div className={styles.leftContent}>
          <VaultInfo />
        </div>
        <div className={styles.rightContent}>
          <Banner
            className={styles.yieldBanner}
            Title="Calculate & Transact"
            description="Estimate your earnings and deposit or withdraw instantly"
            size={BannerSize.Tiny}
          />
          <div className={styles.calculatorContainer}>
            <YieldCalculator />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
