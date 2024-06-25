import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { Modal, useModal } from '@/app/providers';
import { AvailableFunds } from '@/entities/AvailableFunds';
import { Banner, BannerColor, BannerViewType } from '@/entities/Banner';
import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { SafetyScoreDetails } from '@/entities/SafetyScoreDetails';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances } from '@/shared/hooks';
import { ComponentWithProps, Money, Nullable, Vault, VaultResponseData } from '@/shared/types';
import { Button, ButtonSize, ButtonView, LinkView, Text, TextView } from '@/shared/ui';
import { getUserBalanceForVault, VaultCurrency } from '@/shared/utils';

import styles from './VaultInfo.module.scss';

type VaultInfoProps = {
  vault: VaultResponseData;
  contract: Nullable<Vault>;
  currency: VaultCurrency;
};

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({
  vault,
  currency,
  contract,
  className,
}) => {
  const { openModal } = useModal();
  const { isConnected } = useWeb3ModalAccount();
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);
  const [balance, setBalance] = React.useState<Money>();

  React.useEffect(() => {
    const balance = getUserBalanceForVault(currency, usdbBalance, wethBalance, wbtcBalance);
    setBalance(balance);
  }, [usdbBalance, wethBalance, wbtcBalance, currency]);

  const modalProps = React.useMemo(() => {
    return {
      activeTab,
      currency: vault.token,
      vaultContract: contract,
      tokenIcon: vault.icon,
      userDeposit: vault.balance,
    };
  }, [activeTab, contract, vault.balance, vault.icon, vault.token]);

  const onTabChange = React.useCallback(
    (activeTab: YieldSwitchOptions) => {
      openModal(Modal.YieldCalculator, { ...modalProps, activeTab });
      setActiveTab(activeTab);
    },
    [modalProps, openModal],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles.vaultStatsContainer}>
        {isConnected && typeof balance !== 'undefined' && (
          <AvailableFunds
            className={styles.availableFunds}
            balance={balance}
            deposit={vault.balance}
            tokenIcon={vault.icon}
          />
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          weeklyApy={vault.apy}
          cybroPoints={'20'}
          tvl={vault.tvl}
          provider={vault.provider}
          overallVaultInvestment={0}
          tokenIcon={vault.icon}
          yourDeposit={vault.balance}
        />
        <VaultStats
          className={styles.vaultStatsDesktop}
          viewType={VaultStatsView.Full}
          weeklyApy={vault.apy}
          cybroPoints={'20'}
          tvl={vault.tvl}
          provider={vault.provider}
          overallVaultInvestment={0}
          availableFunds={isConnected && balance ? balance : 0}
          tokenIcon={vault.icon}
          yourDeposit={vault.balance}
        />
      </section>
      {/*<HistoricalApyData className={styles.historicalApyData} />*/}
      <SafetyScoreDetails
        vaultId={vault.id}
        trustScore={vault.trust_score}
        inspector={vault.trust_score_inspector}
        className={styles.safetyScoreDetails}
      />
      <section className={styles.extendedVaultDescription}>
        <Text className={styles.title} textView={TextView.H3}>
          Extended Vault Description
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          {vault.description}
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
              onClick={() => openModal(Modal.YieldCalculator, modalProps)}
            >
              Calculate Yield
            </Button>
          }
          caption="Cybro boost faq"
          captionType={LinkView.Tooltip}
        />
      </section>
      <DepositWithdrawTabs
        activeTab={activeTab}
        setActiveTab={onTabChange}
        className={styles.depositWithdrawTabs}
        size={'sm'}
      />
    </div>
  );
};
