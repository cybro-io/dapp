import { Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';
import React from 'react';

type ExchangeTransactionTokenProps = {
  tokenName: string;
  icon: string;
  chainIcon: string;
  amount: number;
  directionName: string;
};

export const ExchangeTransactionToken = ({
  icon,
  amount,
  tokenName,
  directionName,
  chainIcon,
}: ExchangeTransactionTokenProps) => (
  <div className="flex flex-row items-center gap-[7px]">
    <div className="relative">
      <img
        src={icon}
        width={46}
        height={46}
        className="rounded-full bg-stroke-tableBorder"
        alt={tokenName}
      />
      <img
        src={chainIcon}
        width={16}
        height={16}
        className="rounded-full absolute right-0 bottom-0 bg-stroke-tableBorder"
        alt={`Chain icon ${tokenName}`}
      />
    </div>

    <div className="flex flex-col gap-1">
      <div className="inline-flex gap-[5px] items-center">
        <Text textView={TextView.H4}>{formatMoney(amount, 4)}</Text>
        <Text textView={TextView.C4} className="!font-unbounded !font-light opacity-50">
          {tokenName}
        </Text>
      </div>

      <Text textView={TextView.C4} className="!font-unbounded !font-light opacity-50">
        {directionName}
      </Text>
    </div>
  </div>
);
