import { Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';
import React from 'react';

type ExchangeTransactionTokenProps = {
  tokenName: string;
  icon: string;
  amount: number;
  directionName: string;
};

export const ExchangeTransactionToken = ({
  icon,
  amount,
  tokenName,
  directionName,
}: ExchangeTransactionTokenProps) => (
  <div className="flex flex-row items-center gap-[7px]">
    <img src={icon} width={46} height={40} className="rounded-full" alt={tokenName} />
    <div className="flex flex-col gap-1">
      <div className="inline-flex gap-[5px] items-center">
        <Text textView={TextView.H4}>{formatMoney(amount)}</Text>
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
