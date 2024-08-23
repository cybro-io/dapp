import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

import {
  GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe,
  useGetDashboardStatsApiV1DashboardAddressStatsGet,
} from '@/shared/types';

export const useProfilePortfolio = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { data, isLoading } = useGetDashboardStatsApiV1DashboardAddressStatsGet(
    address,
    {
      chain_id: chainId ?? 0,
      timeframe: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All,
    },
    { query: { enabled: Boolean(chainId) && Boolean(address), select: data => data.data?.data } },
  );

  const fields = [
    { label: 'Total Deposit', value: data?.your_deposit ?? '' },
    { label: 'APY', value: `${data?.apy}%` },
    { label: 'Monthly Yield', value: data?.accrued_yield ?? '' },
  ];

  return { fields, isLoading: isLoading || !data, isPortfolioUnavailable: !isConnected };
};
