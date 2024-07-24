import React, { useState, useEffect } from 'react';

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

import { ComponentWithProps } from '@/shared/types';
import { HistoryTab, historyTabs } from '@/widgets/BalanceHistory';

import styles from './BalanceChart.module.scss';

// const data = [
//   { date: new Date('2024-01-01'), balance: 45000 },
//   { date: new Date('2024-02-01'), balance: 50000 },
//   { date: new Date('2024-03-26'), balance: 60000 },
//   { date: new Date('2024-04-27'), balance: 80000 },
//   { date: new Date('2024-05-28'), balance: 45000 },
//   { date: new Date('2024-06-29'), balance: 50000 },
//   { date: new Date('2024-07-30'), balance: 47500 },
//   { date: new Date('2024-08-31'), balance: 55000 },
// ];

type BalanceChartProps = {
  data: any[];
};

const formatDate = (date: any) => {
  return 'test';
  // const month = date.toLocaleString('default', { month: 'short' });
  // const day = date.getDate();
  // return `${month} ${day}`;
};

export const BalanceChart: ComponentWithProps<BalanceChartProps> = ({ data, className }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [historyPeriod, setHistoryPeriod] = React.useState<HistoryTab>(HistoryTab.Today);

  const onTabChange = React.useCallback((period: HistoryTab) => {
    setHistoryPeriod(period);
  }, []);

  const updateWidth = (ev: any) => {
    setWidth(ev.target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    // Removes listener on unmount
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <Tabs
        items={historyTabs}
        onSelectionChange={key => onTabChange(key as HistoryTab)}
        classNames={{
          base: styles.historyTabs,
          tabList: styles.tabList,
          tabContent: clsx(styles.tabContent, 'group-data-[selected=true]:text-[#000000]'),
          panel: styles.panel,
        }}
      >
        {({ key, title }) => (
          <Tab
            className={clsx(styles.tab, key === historyPeriod && styles.selected)}
            key={key}
            title={title}
          />
        )}
      </Tabs>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryZoomContainer zoomDimension="x" />}
        width={width}
        height={350}
        // padding={{ top: 60, bottom: 60, left: 60, right: 60 }}
        domainPadding={{ x: 7, y: 7 }} // Adjust domain padding to ensure dots are fully visible
      >
        <VictoryAxis
          // tickFormat={t => formatDate(t)}
          style={{
            axis: { stroke: 'transparent' }, // Remove X-axis line
            ticks: { stroke: 'transparent' }, // Remove X-axis ticks
            grid: { stroke: 'transparent' }, // Remove vertical grid lines
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={x => `$${x / 1000}K`}
          style={{
            grid: { stroke: 'rgba(255, 255, 255, 0.09)', strokeDasharray: '3,3' },
            axis: { stroke: 'transparent' }, // Remove Y-axis line (optional, if needed)
            ticks: { stroke: 'transparent' }, // Remove Y-axis ticks (optional, if needed)
          }}
        />
        <VictoryLine
          data={data}
          x="month"
          y="balance"
          style={{
            data: { stroke: '#F9E727' },
          }}
        />
        <VictoryScatter
          data={data}
          x="month"
          y="balance"
          size={5}
          style={{
            data: { fill: '#24252E', stroke: '#F9E727', strokeWidth: 3 },
          }}
          labels={({ datum }) => `$${datum.balance}`}
          labelComponent={
            <VictoryTooltip style={{ fontSize: 10 }} flyoutStyle={{ fill: 'white' }} />
          }
        />
      </VictoryChart>
    </div>
  );
};
