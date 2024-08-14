'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { ApyInfo } from '@/entities/ApyInfo';
import { MyVaultsInfo } from '@/entities/MyVaultsInfo';
import { QueryKey } from '@/shared/const';
import {
  ComponentWithProps,
  GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe,
  useGetDashboardHistoryApiV1DashboardAddressStatsGet,
} from '@/shared/types';
import { InfoBox, InfoBoxViewType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import DepositIcon from '../assets/icons/deposit.svg';
import YieldIcon from '../assets/icons/yield.svg';

import styles from './DashboardInfo.module.scss';

type DashboardInfoProps = {};

export const DashboardInfo: ComponentWithProps<DashboardInfoProps> = ({ className }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [period, setPeriod] =
    React.useState<GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe>(
      GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.Today,
    );

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetDashboardHistoryApiV1DashboardAddressStatsGet(
    address || '',
    {
      chain_id: chainId || 0,
      timeframe: period,
    },
    {
      query: {
        queryKey: [QueryKey.DashboardStats, address, period, chainId],
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
