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
import { useBalance } from '@/shared/hooks';
import { ComponentWithProps, Nullable, Token, Vault, VaultResponseData } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  ExtendedVaultSkeleton,
  LinkView,
  Text,
  TextView,
} from '@/shared/ui';
import { isInvalid } from '@/shared/utils';

import styles from './VaultInfo.module.scss';

type VaultInfoProps = {
  vault: Nullable<VaultResponseData>;
  vaultContract: Nullable<Vault>;
  tokenContract: Nullable<Token>;
  isLoading?: boolean;
};

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({
  vault,
  vaultContract,
  tokenContract,
  isLoading = false,
  className,
}) => {
  const { openModal } = useModal();
  const { isConnected } = useWeb3ModalAccount();
  const { balance, vaultDepositUsd } = useBalance(
    tokenContract,
    vaultContract,
    vault?.chain_id,
    vault?.token?.name,
  );
  const [activeTab, setActiveTab] = React.useState<any>(YieldSwitchOptions.Deposit);

  const modalProps = React.useMemo(() => {
    return {
      activeTab,
      vaultId: vault?.id,
      currency: vault?.token.name,
      vaultContract,
      tokenContract,
      tokenIcon: vault?.icon,
      apy: vault?.apy,
      userDeposit: vaultDepositUsd,
      chainId: vault?.chain_id,
      chain: vault?.chain,
    };
  }, [
    activeTab,
    vault?.id,
    vault?.token.name,
    vault?.icon,
    vault?.apy,
    vault?.chain_id,
    vault?.chain,
    vaultContract,
    tokenContract,
    vaultDepositUsd,
  ]);

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
        {isConnected && !isInvalid(balance) && (
          <AvailableFunds
            className={styles.availableFunds}
            balance={balance}
            deposit={vaultDepositUsd}
            tokenIcon={vault?.icon}
          />
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          apy={vault?.apy}
          cybroPoints={'20'}
          tvl={vault?.tvl}
          provider={vault?.provider}
          tokenIcon={vault?.icon}
          yourDeposit={vaultDepositUsd}
          isLoading={isLoading}
        />
        <VaultStats
          className={styles.vaultStatsDesktop}
          viewType={VaultStatsView.Full}
          apy={vault?.apy}
          cybroPoints={'20'}
          tvl={vault?.tvl}
          provider={vault?.provider}
          availableFunds={isConnected && !isInvalid(balance) ? balance : null}
          tokenIcon={vault?.icon}
          yourDeposit={vaultDepositUsd}
          isLoading={isLoading}
        />
      </section>
      {/*<HistoricalApyData className={styles.historicalApyData} />*/}
      <SafetyScoreDetails
        vaultId={vault?.id}
        trustScore={vault?.trust_score}
        inspector={vault?.trust_score_inspector}
        className={styles.safetyScoreDetails}
        isLoading={isLoading}
      />
      {isLoading ? (
        <ExtendedVaultSkeleton />
      ) : (
        <React.Fragment>
          <section className={styles.extendedVaultDescription}>
            <Text className={styles.title} textView={TextView.H3}>
              Extended Vault Description
            </Text>
            <Text className={styles.description} textView={TextView.P2}>
              {vault?.description}
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
        </React.Fragment>
      )}
    </div>
  );
};
