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
  const { address } = useWeb3ModalAccount();
  const { createContractInstance } = useEthers();
  const [contract, setContract] = React.useState<Nullable<Vault>>();
  const [token, setToken] = React.useState<Nullable<Token>>();
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
      if (vault) {
        const { vault: createdVault, token: createdToken } = await createContractInstance(
          vault.address,
          vault.abi,
        );

        setContract(createdVault);
        setToken(createdToken);
      }
    };

    initContracts();
  }, [createContractInstance, vault, vault?.address]);

  const currency = vault?.token as VaultCurrency;

  const vaultName = vault?.name || '';
  const [firstLineTitle, secondLineTitle] = vaultName.split(/\\n|\n/);

  if (isError) {
    return <ErrorMessage className={styles.errorMessage} />;
  }

  return (
    <React.Fragment>
      {isLoading ? (
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
            <br />
            <span className={styles.headingBackground}>{secondLineTitle}</span>
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
          <VaultInfo currency={currency} vault={vault} contract={contract} isLoading={isLoading} />
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
                  vaultContract={contract}
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
