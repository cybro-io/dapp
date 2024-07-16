export enum ApyPeriod {
  Today = 'today',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  All = 'all',
}

export const dropdownData = [
  {
    key: ApyPeriod.Today,
    title: 'Today',
  },
  {
    key: ApyPeriod.Week,
    title: 'Week',
  },
  {
    key: ApyPeriod.Month,
    title: 'Month',
  },
  {
    key: ApyPeriod.Year,
    title: 'Year',
  },
  {
    key: ApyPeriod.All,
    title: 'All',
  },
];

export enum ApyPeriodType {
  Percent = 'percent',
  Fiat = 'fiat',
}
