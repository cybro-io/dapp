import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { Modal, useModal } from '@/app/providers';
import { AvailableFunds } from '@/entities/AvailableFunds';
import { Banner, BannerColor, BannerViewType } from '@/entities/Banner';
import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { HistoricalApyData } from '@/entities/HistoricalApyData';
import { SafetyScoreDetails } from '@/entities/SafetyScoreDetails';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, ButtonView, LinkView, Text, TextView } from '@/shared/ui';

import styles from './VaultInfo.module.scss';

type VaultInfoProps = {};

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({ className }) => {
  const { openModal } = useModal();
  const { isConnected } = useWeb3ModalAccount();
  const { erc20Balance } = useBalances();
  const [activeTab, setActiveTab] = React.useState<string | number>(YieldSwitchOptions.Deposit);

  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles.vaultStatsContainer}>
        {isConnected && erc20Balance && (
          <AvailableFunds className={styles.availableFunds} balance={erc20Balance} />
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          weeklyApy={'999,5'}
          cybroPoints={'20'}
          tvl={'1’100k'}
          provider={'Details'}
          overallVaultInvestment={'500k'}
        />
        <VaultStats
          className={styles.vaultStatsDesktop}
          viewType={VaultStatsView.Full}
          weeklyApy={'999,5'}
          cybroPoints={'20'}
          tvl={'1’100k'}
          provider={'Details'}
          overallVaultInvestment={'500k'}
          availableFunds={isConnected && erc20Balance ? erc20Balance : undefined}
        />
      </section>
      <HistoricalApyData className={styles.historicalApyData} />
      <SafetyScoreDetails className={styles.safetyScoreDetails} />
      <section className={styles.extendedVaultDescription}>
        <Text className={styles.title} textView={TextView.H3}>
          Extended Vault Description
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          The High Yield BTC Strategy vault is designed for investors seeking higher returns through
          dynamic management of Bitcoin assets. The strategy focuses on leveraging market trends and
          fluctuations to optimize performance
        </Text>
        <Button className={styles.button} view={ButtonView.Secondary} size={ButtonSize.Small}>
          View contract details
        </Button>
      </section>
      <section className={styles.yieldCalculator}>
        <Banner
          className={styles.yieldBanner}
          color={BannerColor.Accent}
          viewType={BannerViewType.Mobile}
          Title="Yield Calculator"
          description="You're ready to go! Invite friends using your unique referral link and earn CYBRO Points"
          Button={
            <Button
              className={styles.yieldButton}
              view={ButtonView.Secondary}
              onClick={() => openModal(Modal.YieldCalculator, { activeTab })}
            >
              Calculate Yield
            </Button>
          }
          caption="Cybro boost faq"
          captionType={LinkView.Tooltip}
        />
        <DepositWithdrawTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    </div>
  );
};
