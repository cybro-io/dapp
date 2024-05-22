'use client';

import React from 'react';

import { Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import styles from './HistoricalApyData.module.scss';

type HistoricalApyDataProps = {};

const data = [
  { name: 'Jan', uv: 35000, percent: '10%' },
  { name: 'Feb', uv: 40000, percent: '12%' },
  { name: 'Mar', uv: 37500, percent: '11.5%' },
  { name: 'Apr', uv: 42500, percent: '14.5%' },
  { name: 'May', uv: 46000, percent: '16%' },
  { name: 'Jan', uv: 35000, percent: '10%' },
  { name: 'Feb', uv: 40000, percent: '12%' },
  { name: 'Mar', uv: 37500, percent: '11.5%' },
  { name: 'Apr', uv: 42500, percent: '14.5%' },
  { name: 'May', uv: 46000, percent: '16%' },
];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} stroke="#C1A33B" strokeWidth={2} fill="transparent" />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize={10}>
        {payload.percent}
      </text>
    </g>
  );
};

export const HistoricalApyData: ComponentWithProps<HistoricalApyDataProps> = ({ className }) => {
  return (
    <section className={clsx(styles.root, className)}>
      <Text className={styles.heading} textView={TextView.H3}>
        Historical APY Data
      </Text>
      <Text className={styles.description} textView={TextView.P3}>
        This section shows the historical APY for our High Yield BTC Strategy vault, highlighting
        its success in leveraging market trends to enhance returns for Vault investors.
      </Text>
      {/*<ScatterChart className={styles.chart}>*/}
      {/*  <CartesianGrid strokeDasharray="3 3" />*/}
      {/*</ScatterChart>*/}
      <ResponsiveContainer className={styles.chartContainer} width="100%" height={265}>
        {/*<ScatterChart*/}
        {/*  width={800}*/}
        {/*  height={400}*/}
        {/*  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}*/}
        {/*>*/}
        {/*  <CartesianGrid />*/}
        {/*  <XAxis type="category" dataKey="name" />*/}
        {/*  <YAxis type="number" dataKey="value" domain={[30000, 60000]} />*/}
        {/*  <Tooltip />*/}
        {/*  <Legend />*/}
        {/*  <Scatter name="A" data={data} fill="#8884d8">*/}
        {/*    <LabelList dataKey="percent" position="top" />*/}
        {/*  </Scatter>*/}
        {/*</ScatterChart>*/}
      </ResponsiveContainer>
    </section>
  );
};
