'use client';

import React, { useEffect, useState } from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import clsx from 'clsx';

import { ApyInfo } from '@/entities/ApyInfo';
import { MyVaultsInfo } from '@/entities/MyVaultsInfo';
import { QueryKey } from '@/shared/const';
import {
  ComponentWithProps,
  useGetDashboardStatsApiV1DashboardAddressStatsGet,
  GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe,
} from '@/shared/types';
import { InfoBox, InfoBoxViewType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import DepositIcon from '../assets/icons/deposit.svg';
import YieldIcon from '../assets/icons/yield.svg';

import styles from './DashboardInfo.module.scss';

type DashboardInfoProps = {};

export const DashboardInfo: ComponentWithProps<DashboardInfoProps> = ({ className }) => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const [address, setAddress] = useState<string | null>(null); // State to store address
  const [period, setPeriod] =
    React.useState<GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe>(
      GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All,
    );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAddress = localStorage.getItem('address');
      setAddress(storedAddress);
    }
  }, []);

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetDashboardStatsApiV1DashboardAddressStatsGet(
    address || '',
    {
      chain_id: chainId || 0,
      timeframe: period,
    },
    {
      query: {
        queryKey: [QueryKey.DashboardStats, period, chainId, address],
      },
    },
  );

  const statsData = data?.data?.data;
  const isLoading = isDataLoading || !statsData;

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.mobile}>
        <InfoBox
          icon={<DepositIcon />}
          title={'Your deposit'}
          value={`$${formatUserMoney(statsData?.your_deposit)}`}
          isLoading={isLoading}
        />
        <InfoBox
          icon={<YieldIcon />}
          title={'Accrued yield'}
          value={`$${formatUserMoney(statsData?.accrued_yield)}`}
          isLoading={isLoading}
        />
        <MyVaultsInfo vaults={statsData?.my_vaults} isLoading={isLoading} />
        <ApyInfo
          apy={statsData?.apy}
          apyFiat={statsData?.future_balance_usd}
          period={period}
          setPeriod={setPeriod}
          isLoading={isLoading}
        />
      </div>

      <div className={styles.desktop}>
        <InfoBox
          icon={<DepositIcon />}
          title={'Your deposit'}
          value={`$${formatUserMoney(statsData?.your_deposit)}`}
          viewType={InfoBoxViewType.Desktop}
          isLoading={isLoading}
        />
        <InfoBox
          icon={<YieldIcon />}
          title={'Accrued yield'}
          value={`$${formatUserMoney(statsData?.accrued_yield)}`}
          viewType={InfoBoxViewType.Desktop}
          isLoading={isLoading}
        />
        <MyVaultsInfo
          vaults={statsData?.my_vaults}
          viewType={InfoBoxViewType.Desktop}
          isLoading={isLoading}
        />
        <ApyInfo
          apy={statsData?.apy}
          apyFiat={statsData?.future_balance_usd}
          period={period}
          setPeriod={setPeriod}
          viewType={InfoBoxViewType.Desktop}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
