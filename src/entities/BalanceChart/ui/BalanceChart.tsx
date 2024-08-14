import React, { Dispatch, SetStateAction } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';

import { CustomTooltip } from '@/entities/BalanceChart/ui/components';
import { ComponentWithProps, DashboardHistoryData } from '@/shared/types';
import { Loader, Text } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { PeriodTab, periodTabs, TxActionType } from '@/widgets/BalanceHistory';
import { formatChartDate } from '@/widgets/BalanceHistory/utils';

import styles from './BalanceChart.module.scss';

type BalanceChartProps = {
  period: PeriodTab;
  setPeriod: Dispatch<SetStateAction<PeriodTab>>;
  hoveredTransaction: string | null;
  setHoveredTransaction: (tx: string | null) => void;
  data: DashboardHistoryData[];
  historyPeriod?: PeriodTab;
  isLoading?: boolean;
};

export const BalanceChart: ComponentWithProps<BalanceChartProps> = ({
  data,
  period,
  setPeriod,
  hoveredTransaction,
  setHoveredTransaction,
  isLoading = false,
  className,
}) => {
  const [width, setWidth] = React.useState<number>();
  const [chartWidth, setChartWidth] = React.useState(0);
  const chartRef = React.useRef<HTMLDivElement>(null);

  const onTabChange = React.useCallback(
    (period: PeriodTab) => {
      setPeriod(period);
    },
    [setPeriod],
  );

  const updateWidth = () => {
    setWidth(window.innerWidth);

    if (chartRef.current) {
      setChartWidth(chartRef.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);

    if (chartRef.current) {
      updateWidth();
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [chartRef.current?.offsetWidth]);

  // Process the data for the chart
  const chartData = data.map(item => ({
    x: formatChartDate(item.ts, period),
    y: parseFloat(item.balance_usd),
    tx: item,
  }));

  // if (!isLoading && !chartData.length) {
  //   return 'No transactions';
  // }
  //
  // console.log(isLoading, 'one');
  // console.log(chartData, 'two');

  return (
    <div ref={chartRef} className={clsx(styles.root, className)}>
      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        <React.Fragment>
          <Tabs
            items={periodTabs}
            selectedKey={period}
            onSelectionChange={key => onTabChange(key as PeriodTab)}
            classNames={{
              base: styles.historyTabs,
              tabList: styles.tabList,
              tabContent: clsx(styles.tabContent, 'group-data-[selected=true]:text-[#000000]'),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === period && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          {chartWidth && chartData.length ? (
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryZoomContainer zoomDimension="x" />}
              width={chartWidth - 7 * 2}
              height={width || 0 >= 1100 ? 450 : 350}
              domainPadding={{ x: 30, y: 10 }}
            >
              <VictoryAxis
                tickFormat={t => t}
                tickCount={5}
                style={{
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  grid: { stroke: 'transparent' },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={x => `$${x / 1000}K`}
                style={{
                  grid: { stroke: 'rgba(255, 255, 255, 0.09)', strokeDasharray: '3,3' },
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                }}
              />
              <VictoryLine
                data={chartData}
                style={{
                  data: { stroke: '#F9E727' },
                }}
              />
              <VictoryScatter
                data={chartData}
                size={5}
                style={{
                  data: {
                    fill: d =>
                      hoveredTransaction && hoveredTransaction === d.datum?.tx.transaction_hash
                        ? '#FFD700'
                        : '#24252E',
                    stroke: d =>
                      hoveredTransaction && hoveredTransaction === d.datum?.tx.transaction_hash
                        ? '#FFD700'
                        : '#F9E727',
                    strokeWidth: 3,
                  },
                }}
                labels={({ datum }) => ''}
                // labels={({ datum }) => {
                //   if (datum.tx.action === TxActionType.Group) {
                //     return `$${formatUserMoney(datum.tx.size_usd, 2)}`;
                //   } else {
                //     return `${datum.tx.action} ${formatUserMoney(datum.tx.size_usd, 2)}`;
                //   }
                // }}
                labelComponent={
                  <VictoryTooltip flyoutComponent={<CustomTooltip />} />
                  // <VictoryTooltip
                  //   flyoutStyle={{ fill: 'rgba(0, 0, 0, 0.8)', stroke: 'none' }}
                  //   style={{ fontSize: 14, fill: '#FFFFFF' }}
                  //   pointerLength={0}
                  //   cornerRadius={5}
                  //   flyoutPadding={{ top: 8, bottom: 8, left: 12, right: 12 }}
                  // />
                }
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onMouseOver: () => [
                        {
                          target: 'data',
                          mutation: props => {
                            setHoveredTransaction(props.datum.tx.transaction_hash);
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ],
                      onMouseOut: () => [
                        {
                          target: 'data',
                          mutation: () => {
                            setHoveredTransaction(null);
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
                        },
                      ],
                    },
                  },
                ]}
              />
            </VictoryChart>
          ) : (
            <Text className={styles.emptyText}>No transactions</Text>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

// Today //
// group by minutes

// Week
// Group by days

// Month
// Group by days

// Year
// Group by months

// All
// Group by months
