import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import MaximizeIcon from '@/shared/assets/icons/maximize.svg';
import { ExchangeHistoryDataPoint } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import { ExchangeTransactionToken } from './ExchangeTransactionToken';
import dayjs from 'dayjs';
import { useMediaQuery } from 'usehooks-ts';

type ExchangeTransactionRowProps = {
  destination: ExchangeHistoryDataPoint;
  source: ExchangeHistoryDataPoint;
  link: string;
  isContained: boolean;
  createdAt: string;
};

export const ExchangeTransactionRow = ({
  destination,
  source,
  link,
  isContained,
  createdAt,
}: ExchangeTransactionRowProps) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-3 rounded-[20px] p-[15px] h-[85px]',
        isContained && 'bg-background-tableRow',
      )}
    >
      <ExchangeTransactionToken
        tokenName={source.token.name}
        amount={Number(source.size)}
        icon={source.token.icon}
        directionName="You pay"
      />
      <ExchangeTransactionToken
        tokenName={destination.token.name}
        amount={Number(destination.size)}
        icon={destination.token.icon}
        directionName="You recieve"
      />
      <div className="flex flex-col justify-between items-end">
        <Link
          href={link}
          target="_blank"
          className="flex flex-row gap-[5px] items-center font-unbounded font-light"
        >
          <span>Transaction details</span> <MaximizeIcon />
        </Link>
        <Text textView={TextView.C4} className="!font-unbounded !font-light opacity-50">
          {dayjs(createdAt).format('DD MMM YYYY HH:mm')}
        </Text>
      </div>
    </div>
  );
};
