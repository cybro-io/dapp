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
import { useVault } from '@/shared/hooks/vault';
import { ComponentWithProps, Money } from '@/shared/types';
import { Button, ButtonSize, ButtonView, LinkView, Text, TextView } from '@/shared/ui';
import { getUserBalanceForVault, VaultType } from '@/shared/utils';

import styles from './VaultInfo.module.scss';

type VaultInfoProps = {
  vaultType: VaultType;
};

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({ vaultType, className }) => {
  const { openModal } = useModal();
  const { isConnected } = useWeb3ModalAccount();
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  ///////// MOCK /////////
  const [balance, setBalance] = React.useState<Money>();

  React.useEffect(() => {
    const balance = getUserBalanceForVault(vaultType, usdbBalance, wethBalance, wbtcBalance);
    setBalance(balance);
  }, [usdbBalance, wethBalance, wbtcBalance, vaultType]);

  const { totalAssets, userDeposit } = useVault(vaultType);
  //////////////////

  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles.vaultStatsContainer}>
        {isConnected && usdbBalance && (
          <AvailableFunds
            className={styles.availableFunds}
            balance={usdbBalance}
            deposit={userDeposit}
          />
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          weeklyApy={'999,5'}
          cybroPoints={'20'}
          tvl={totalAssets}
          provider={'Details'}
          overallVaultInvestment={totalAssets}
        />
        <VaultStats
          className={styles.vaultStatsDesktop}
          viewType={VaultStatsView.Full}
          weeklyApy={'999,5'}
          cybroPoints={'20'}
          tvl={totalAssets}
          provider={'Details'}
          overallVaultInvestment={totalAssets}
          availableFunds={isConnected && balance ? balance : 0}
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
