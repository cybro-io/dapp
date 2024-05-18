import React from 'react';

import clsx from 'clsx';

import { Banner, BannerSize, BannerViewType } from '@/entities/Banner';
import { JoinCommunityBanner } from '@/entities/JoinCommunityBanner';
import { Tvl } from '@/entities/Tvl';
import { Vault } from '@/entities/Vault';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, ButtonView, LinkView, Text, TextView } from '@/shared/ui';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

export const AvailableVaults: ComponentWithProps<AvailableVaultsProps> = ({ className }) => {
  const vaults = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H2}>
          Available Vaults
        </Text>
        <Tvl className={styles.chip}>Cybro TVL $950,000</Tvl>
      </div>

      <div className={styles.vaults}>
        {vaults.map((vault, index) => {
          if (index === 2) {
            return (
              <React.Fragment>
                <Banner
                  viewType={BannerViewType.Dark}
                  size={BannerSize.Small}
                  className={styles.smallBanner}
                  Title={
                    <Text className={styles.smallBannerTitle}>
                      Join the <span className={styles.smallBannerTitleAccent}>Points Hunt</span>
                    </Text>
                  }
                  Button={
                    <Button className={styles.smallBannerButton} size={ButtonSize.Medium}>
                      Buy Crypto Tokens
                    </Button>
                  }
                />
                <JoinCommunityBanner className={clsx(styles.joinBanner, styles.joinBannerMobile)} />
                <Vault />
              </React.Fragment>
            );
          }

          if (index === 5) {
            return (
              <React.Fragment>
                <Banner
                  viewType={BannerViewType.Accent}
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
                <Vault />
              </React.Fragment>
            );
          }

          if (index === 7) {
            return (
              <React.Fragment>
                <Vault />
                <JoinCommunityBanner
                  className={clsx(styles.joinBanner, styles.joinBannerDesktop)}
                />
              </React.Fragment>
            );
          }

          return <Vault />;
        })}
      </div>
    </section>
  );
};
