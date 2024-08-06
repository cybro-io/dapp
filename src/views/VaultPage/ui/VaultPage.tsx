'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { useEthers } from '@/app/providers';
import { Banner, BannerSize } from '@/entities/Banner';
import { ChainToExplorerUrl, QueryKey } from '@/shared/const';
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
  Button,
  ButtonView,
  ButtonSize,
} from '@/shared/ui';
import { isInvalid, VaultCurrency } from '@/shared/utils';
import { ErrorMessage } from '@/widgets/ErrorMessage';
import { VaultInfo } from '@/widgets/VaultInfo';
import { YieldCalculator } from '@/widgets/YieldCalculator';

import styles from './VaultPage.module.scss';

type DashboardPageProps = {
  vaultId: number;
};

export const VaultPage: ComponentWithProps<DashboardPageProps> = ({ vaultId }) => {
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { createVaultInstance } = useEthers();
  const [vaultContract, setVaultContract] = React.useState<Nullable<Vault>>();
  const [tokenContract, setTokenContract] = React.useState<Nullable<Token>>();
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
        const { vault: createdVault, token: createdToken } = await createVaultInstance(
          vault.address,
          vault.abi,
        );

        setVaultContract(createdVault);
        setTokenContract(createdToken);
      }
    };

    initContracts();
  }, [isConnected, vault?.address, vault?.abi]);

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
            {vault?.icon && (
              <Image
                className={styles.vaultIcon}
                src={vault?.icon}
                alt={''}
                width={87}
                height={66}
              />
            )}
            <span className={styles.tokenName}>{vault.token.name}</span>
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
            {vault?.description}
          </Text>
          <div className={styles.chipsContainer}>
            {vault?.badges.map(badge => (
              <Chip className={styles.chip} size={ChipSize.Large} key={badge}>
                {badge}
              </Chip>
            ))}
          </div>
          {!isInvalid(chainId) && vaultContract?.target && (
            <Link
              className={styles.contractDetails}
              href={`${ChainToExplorerUrl[chainId]}/address/${vaultContract.target}`}
              target="_blank"
            >
              <Button className={styles.button} view={ButtonView.Secondary} size={ButtonSize.Small}>
                View contract details
              </Button>
            </Link>
          )}
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
            <div className={styles.rightContentContainer}>
              <Banner
                className={styles.yieldBanner}
                title="Calculate & Transact"
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
            </div>
          ) : (
            <CalculatorSkeleton />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
