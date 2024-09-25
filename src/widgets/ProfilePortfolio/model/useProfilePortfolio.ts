import { useWeb3ModalAccount } from '@/shared/lib';
import {
  GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe,
  useGetDashboardStatsApiV1DashboardAddressStatsGet,
} from '@/shared/types';

export const useProfilePortfolio = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { data, isLoading } = useGetDashboardStatsApiV1DashboardAddressStatsGet(
    address!,
    {
      chain_id: chainId ?? 0,
      timeframe: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All,
    },
    {
      query: {
        enabled: Boolean(chainId) && Boolean(address),
        select: (data) => data.data?.data,
      },
    },
  );

  const fields = [
    { label: 'Valuation', value: data?.your_deposit ?? '' },
    {
      label: 'APY',
      value: data?.apy ? `${Number(data?.apy).toFixed(2)}%` : 'n/a',
    },
    { label: 'Monthly Yield', value: data?.accrued_yield ?? '' },
  ];

  return {
    fields,
    isLoading: isLoading || !data,
    isPortfolioUnavailable: !isConnected,
  };
};
