'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import Image from 'next/image';

import { useEthers } from '@/app/providers';
import { Banner, BannerSize } from '@/entities/Banner';
import { QueryKey } from '@/shared/const';
import {
  ComponentWithProps,
  Nullable,
  Token,
  useGetVaultApiV1VaultsVaultIdGet,
  Vault,
} from '@/shared/types';
import {
  Chip,
  ChipSize,
  Text,
  TextView,
  VaultPageHeaderSkeleton,
  CalculatorSkeleton,
} from '@/shared/ui';
import { VaultCurrency } from '@/shared/utils';
import { ErrorMessage } from '@/widgets/ErrorMessage';
import { VaultInfo } from '@/widgets/VaultInfo';
import { YieldCalculator } from '@/widgets/YieldCalculator';

import styles from './VaultPage.module.scss';

type DashboardPageProps = {
  vaultId: number;
};

export const VaultPage: ComponentWithProps<DashboardPageProps> = ({ vaultId }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { createVaultInstance } = useEthers();
  const [vaultContract, setVaultContract] = React.useState<Nullable<Vault>>();
  const [tokenContract, setTokenContract] = React.useState<Nullable<Token>>();
  const [isContractsLoading, setIsContractsLoading] = React.useState<boolean>(false);
  const { data, isLoading, isError } = useGetVaultApiV1VaultsVaultIdGet(
    vaultId,
    { address },
    {
      query: { queryKey: [QueryKey.Vault, vaultId, address] },
    },
  );
  const vault = data?.data?.data;

  React.useEffect(() => {
    const initContracts = async () => {
      if (vault && isConnected) {
        setIsContractsLoading(true);
        const { vault: createdVault, token: createdToken } = await createVaultInstance(
          vault.address,
          vault.abi,
        );

        setIsContractsLoading(false);
        setVaultContract(createdVault);
        setTokenContract(createdToken);
      }
    };

    initContracts();
  }, [createVaultInstance, vault, vault?.address, isConnected]);

  const currency = vault?.token.name as VaultCurrency;

  const vaultName = vault?.name || '';
  const [firstLineTitle, secondLineTitle] = vaultName.split(/\\n|\n/);

  if (isError) {
    return <ErrorMessage className={styles.errorMessage} />;
  }

  return (
    <React.Fragment>
      {isLoading || !vault ? (
        <VaultPageHeaderSkeleton />
      ) : (
        <section className={clsx(styles.heroSection)}>
          <div className={styles.tetherContainer}>
            {vault?.icon && <Image src={vault?.icon} alt={''} width={87} height={66} />}
          </div>
          <Text className={styles.heading} textView={TextView.H1}>
            <span className={clsx(styles.headingBackground, styles.headingBackgroundTop)}>
              <span className={styles.accent}>{firstLineTitle}</span>
            </span>
            {secondLineTitle && (
              <React.Fragment>
                <br />
                <span className={styles.headingBackground}>{secondLineTitle}</span>
              </React.Fragment>
            )}
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.desktopDescription, styles.description)}
          >
            {vault?.description}
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.mobileDescription, styles.description)}
          >
            Maximize your returns with strategic Bitcoin investments
          </Text>
          <div className={styles.chipsContainer}>
            {vault?.badges.map(badge => (
              <Chip className={styles.chip} size={ChipSize.Large} key={badge}>
                {badge}
              </Chip>
            ))}
          </div>
        </section>
      )}
      <div className={styles.main}>
        <div className={styles.leftContent}>
          <VaultInfo
            vault={vault}
            vaultContract={vaultContract}
            tokenContract={tokenContract}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.rightContent}>
          {!isLoading && vault ? (
            <React.Fragment>
              <Banner
                className={styles.yieldBanner}
                Title="Calculate & Transact"
                description="Estimate your earnings and deposit or withdraw instantly"
                size={BannerSize.Tiny}
              />

              <div className={styles.calculatorContainer}>
                <YieldCalculator
                  vaultId={vaultId}
                  tokenIcon={vault.icon}
                  apy={vault.apy}
                  vaultContract={vaultContract}
                  tokenContract={tokenContract}
                  currency={currency}
                  chainId={vault.chain_id}
                  chain={vault.chain}
                />
              </div>
            </React.Fragment>
          ) : (
            <CalculatorSkeleton />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
