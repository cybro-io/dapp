'use client';

import React from 'react';

import clsx from 'clsx';

import { Banner, BannerColor, BannerSize } from '@/entities/Banner';
import { JoinCommunityBanner } from '@/entities/JoinCommunityBanner';
import { Tvl } from '@/entities/Tvl';
import { Vault } from '@/entities/Vault';
import { QueryKey } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';
import { useGetVaultsApiV1VaultsGet } from '@/shared/types/__generated/api/fastAPI';
import {
  Button,
  ButtonSize,
  ButtonView,
  LinkView,
  Text,
  TextView,
  VaultSkeleton,
} from '@/shared/ui';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const AvailableVaults: ComponentWithProps<AvailableVaultsProps> = ({ className }) => {
  const { data, isLoading, isError } = useGetVaultsApiV1VaultsGet(
    {},
    { query: { queryKey: [QueryKey.AvailableVaults] } },
  );

  const vaults = data?.data?.data || [];

  if (isError) {
    return 'Error...';
  }

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H2}>
          Available Vaults
        </Text>
        <Tvl className={styles.chip}>Cybro TVL $950,000</Tvl>
      </div>

      <div className={styles.vaults}>
        {isLoading && skeletons.map(index => <VaultSkeleton key={index} />)}
        {vaults.map((vault, index) => {
          if (index === 2) {
            return (
              <React.Fragment key={vault.id}>
                <Banner
                  color={BannerColor.Dark}
                  size={BannerSize.Small}
                  className={styles.smallBanner}
                  Title={
                    <Text className={styles.smallBannerTitle}>
                      Join the <span className={styles.smallBannerTitleAccent}>Points Hunt</span>
                    </Text>
                  }
                  Button={
                    <Button
                      className={styles.smallBannerButton}
                      size={ButtonSize.Medium}
                      onClick={() => window.open('https://cybro.io/', '_blank')}
                    >
                      Buy Crypto Tokens
                    </Button>
                  }
                />
                <JoinCommunityBanner className={clsx(styles.joinBanner, styles.joinBannerMobile)} />
                <Vault vault={vault} />
              </React.Fragment>
            );
          }

          if (index === 5) {
            return (
              <React.Fragment key={vault.id}>
                <Banner
                  color={BannerColor.Accent}
                  size={BannerSize.Big}
                  className={styles.bigBanner}
                  Title="Become &nbsp; the CYBRO Evangelist"
                  description="You're ready to go! Invite friends using your unique referral link and earn CYBRO Points"
                  Button={
                    <Button
                      className={styles.bigBannerButton}
                      size={ButtonSize.Medium}
                      view={ButtonView.Secondary}
                    >
                      Buy Crypto Tokens
                    </Button>
                  }
                  caption="Cybro points faq"
                  captionType={LinkView.Tooltip}
                />
                <JoinCommunityBanner className={clsx(styles.joinBanner, styles.joinBannerMobile)} />
                <Vault vault={vault} />
              </React.Fragment>
            );
          }

          if (index === 7) {
            return (
              <React.Fragment key={vault.id}>
                <Vault vault={vault} />
                <JoinCommunityBanner
                  className={clsx(styles.joinBanner, styles.joinBannerDesktop)}
                />
              </React.Fragment>
            );
          }

          return <Vault vault={vault} key={vault.id} />;
        })}
      </div>
    </section>
  );
};
