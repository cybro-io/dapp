import { GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe } from '@/shared/types';


export const dropdownData = [
  {
    key: GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.Today,
    title: 'Today',
  },
  {
    key: GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.Week,
    title: 'Week',
  },
  {
    key: GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.Month,
    title: 'Month',
  },
  {
    key: GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.Year,
    title: 'Year',
  },
  {
    key: GetDashboardHistoryApiV1DashboardAddressStatsGetTimeframe.All,
    title: 'All',
  },
];

export enum ApyPeriodType {
  Percent = 'percent',
  Fiat = 'fiat',
}
