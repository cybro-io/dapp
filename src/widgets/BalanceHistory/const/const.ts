export enum HistoryTab {
  Today = 'today',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  All = 'all',
}

export const historyTabs = [
  {
    key: HistoryTab.Today,
    title: 'Today',
  },
  {
    key: HistoryTab.Week,
    title: 'Week',
  },
  {
    key: HistoryTab.Month,
    title: 'Month',
  },
  {
    key: HistoryTab.Year,
    title: 'Year',
  },
  {
    key: HistoryTab.All,
    title: 'All',
  },
];
