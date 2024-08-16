import { Text, TextView } from '@/shared/ui';
import { formatMoney } from '@/shared/utils';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

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
}: ExchangeTransactionTokenProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  return (
    <div className="flex flex-row items-center gap-[7px]">
      <div className="relative">
        <img
          src={icon}
          className="size-5 xl:size-[46px] rounded-full bg-stroke-tableBorder"
          alt={tokenName}
        />
        <img
          src={chainIcon}
          className="size-[7px] xl:size-4 rounded-full absolute right-0 bottom-0 bg-stroke-tableBorder"
          alt={`Chain icon ${tokenName}`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="inline-flex gap-[5px] items-center">
          <Text textView={isSmallScreen ? TextView.BU2 : TextView.H4}>
            {formatMoney(amount, 4)}
          </Text>
          <Text
            textView={isSmallScreen ? TextView.BP3 : TextView.C4}
            className="!font-unbounded !font-light opacity-50"
          >
            {tokenName}
          </Text>
        </div>

        <Text
          textView={TextView.C4}
          className="!hidden xl:!block !font-unbounded !font-light opacity-50"
        >
          {directionName}
        </Text>
      </div>
    </div>
  );
};
