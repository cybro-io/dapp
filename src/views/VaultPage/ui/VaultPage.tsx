'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { Banner, BannerSize } from '@/entities/Banner';
import { QueryKey } from '@/shared/const/queryKey';
import {
  ComponentWithProps,
  useGetVaultApiV1VaultsVaultIdGet,
  VaultResponse,
} from '@/shared/types';
import { Chip, ChipSize, Text, TextView } from '@/shared/ui';
import { VaultCurrency } from '@/shared/utils';
import { VaultInfo } from '@/widgets/VaultInfo';
import { YieldCalculator } from '@/widgets/YieldCalculator';

import styles from './VaultPage.module.scss';

type DashboardPageProps = {
  vaultId: number;
};

export const VaultPage: ComponentWithProps<DashboardPageProps> = ({ vaultId }) => {
  const { data, isLoading, isError } = useGetVaultApiV1VaultsVaultIdGet(
    vaultId,
    {},
    {
      query: { queryKey: [QueryKey.Vault, vaultId] },
    },
  );
  const vault = (data as { data: VaultResponse })?.data?.data;

  if (!vault) {
    return 'Error...';
  }

  const vaultType = vault?.token as VaultCurrency;

  return (
    <React.Fragment>
      <section className={clsx(styles.heroSection)}>
        <div className={styles.tetherContainer}>
          <Image src={vault.icon} alt={''} width={87} height={66} />
        </div>
        <Text className={styles.heading} textView={TextView.H1}>
          <span className={clsx(styles.headingBackground, styles.headingBackgroundTop)}>
            <span className={styles.accent}>{vault.name}</span>
          </span>
          {/*<br />*/}
          {/*<span className={styles.headingBackground}></span>*/}
        </Text>
        <Text
          textView={TextView.P3}
          className={clsx(styles.desktopDescription, styles.description)}
        >
          {vault.description}
        </Text>
        <Text textView={TextView.P3} className={clsx(styles.mobileDescription, styles.description)}>
          Maximize your returns with strategic Bitcoin investments
        </Text>
        <div className={styles.chipsContainer}>
          {vault.badges.map(badge => (
            <Chip className={styles.chip} size={ChipSize.Large}>
              {badge}
            </Chip>
          ))}
        </div>
      </section>
      <div className={styles.main}>
        <div className={styles.leftContent}>
          <VaultInfo vaultType={vaultType} vault={vault} />
        </div>
        <div className={styles.rightContent}>
          <Banner
            className={styles.yieldBanner}
            Title="Calculate & Transact"
            description="Estimate your earnings and deposit or withdraw instantly"
            size={BannerSize.Tiny}
          />
          <div className={styles.calculatorContainer}>
            <YieldCalculator vaultType={vaultType} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
