'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { Banner, BannerColor, BannerSize } from '@/entities/Banner';
import { JoinCommunityBanner } from '@/entities/JoinCommunityBanner';
import { Tvl } from '@/entities/Tvl';
import { Vault } from '@/entities/Vault';
import { QueryKey } from '@/shared/const';
import {
  ComponentWithProps,
  useGetBalanceByAddressApiV1ProfileAddressBalanceGet,
} from '@/shared/types';
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
import { transformBalances } from '@/shared/utils';
import { ErrorMessage } from '@/widgets/ErrorMessage';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const AvailableVaults: ComponentWithProps<AvailableVaultsProps> = ({ className }) => {
  const { address, chainId } = useWeb3ModalAccount();
  const { data, isLoading, isError } = useGetVaultsApiV1VaultsGet(
    {},
    { query: { queryKey: [QueryKey.AvailableVaults] } },
  );

  const { data: balanceData } = useGetBalanceByAddressApiV1ProfileAddressBalanceGet(
    address || '',
    { chain_id: chainId || 0 },
    {
      query: { queryKey: [QueryKey.UserBalance, address, chainId] },
    },
  );

  const vaults = data?.data?.data || [];
  const balance = React.useMemo(
    () => transformBalances(balanceData?.data?.data || []),
    [balanceData?.data?.data],
  );

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H2}>
          Available Vaults
        </Text>
        <Tvl className={styles.chip} />
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
                      Join the
                      <br /> <span className={styles.smallBannerTitleAccent}>Points Hunt</span>
                    </Text>
                  }
                  Button={
                    <Button
                      className={styles.smallBannerButton}
                      size={ButtonSize.Medium}
                      onClick={() => window.open('https://cybro.io/', '_blank')}
                    >
                      Buy Cybro Tokens
                    </Button>
                  }
                />
                <JoinCommunityBanner className={clsx(styles.joinBanner, styles.joinBannerMobile)} />
                <Vault vault={vault} userBalance={balance[vault.token.address]} />
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
                      onClick={() => window.open('https://cybro.io/', '_blank')}
                    >
                      Buy Cybro Tokens
                    </Button>
                  }
                  caption="Cybro points faq"
                  captionType={LinkView.Link}
                  captionHref={'https://docs.cybro.io/cybro/usdcybro-token/cybro-points'}
                  captionTarget="_blank"
                />
                <JoinCommunityBanner className={clsx(styles.joinBanner, styles.joinBannerMobile)} />
                <Vault vault={vault} userBalance={balance[vault.token.address]} />
              </React.Fragment>
            );
          }

          if (index === 9) {
            return (
              <React.Fragment key={vault.id}>
                <Vault vault={vault} userBalance={balance[vault.token.address]} />
                <JoinCommunityBanner
                  className={clsx(styles.joinBanner, styles.joinBannerDesktop)}
                />
              </React.Fragment>
            );
          }

          return <Vault vault={vault} userBalance={balance[vault.token.address]} key={vault.id} />;
        })}
      </div>
    </section>
  );
};
