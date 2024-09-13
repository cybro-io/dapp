import React from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { utils } from 'ethers';
import Link from 'next/link';

import { useSwapTokens } from '@/entities/SwapToken';
import MaximizeIcon from '@/shared/assets/icons/maximize.svg';
import { SymbiosisTransaction } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import { ExchangeTransactionToken } from './ExchangeTransactionToken';
import { useMediaQuery } from 'usehooks-ts';

type ExchangeTransactionRowProps = {
  isContained: boolean;
  transaction: SymbiosisTransaction;
};

const preparedTokenAddress = (address: string) =>
  address === '0x0000000000000000000000000000000000000000' ? '' : address;

export const ExchangeTransactionRow = ({
  isContained,
  transaction,
}: ExchangeTransactionRowProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  const { from_route, to_route, created_at } = transaction;

  const { findToken } = useSwapTokens();

  const tokenIn = from_route?.at(0);
  const tokenOut = to_route?.at(-1);

  if (!tokenIn || !tokenOut) {
    return null;
  }

  const findTokenIn = findToken(preparedTokenAddress(tokenIn.token.address), tokenIn.chain_id);
  const findTokenOut = findToken(preparedTokenAddress(tokenOut.token.address), tokenOut.chain_id);

  if (isSmallScreen) {
    return (
      <div
        className={clsx(
          'grid grid-cols-[4fr_1fr] justify-between rounded-[20px] px-4 py-[13px] min-h-[76px]',
          isContained && 'bg-background-tableRow',
        )}
      >
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <ExchangeTransactionToken
              tokenName={tokenIn.token.symbol}
              amount={Number(utils.formatUnits(String(tokenIn.amount), tokenIn.token.decimals))}
              icon={String(findTokenIn?.icons?.small)}
              chainIcon={String(findTokenIn?.chain?.icons?.small)}
              directionName="You pay"
            />
            <Text textView={TextView.BP3} className="opacity-60">
              for
            </Text>
            <ExchangeTransactionToken
              tokenName={tokenOut.token.symbol}
              amount={Number(utils.formatUnits(String(tokenOut.amount), tokenOut.token.decimals))}
              icon={String(findTokenOut?.icons?.small)}
              chainIcon={String(findTokenOut?.chain?.icons?.small)}
              directionName="You recieve"
            />
          </div>
          <Text textView={TextView.C4} className="!font-unbounded !font-light opacity-50">
            {dayjs(created_at).format('DD MMM YYYY HH:mm')}
          </Text>
        </div>

        <div className="flex justify-end items-center">
          <Link
            href={`https://explorer.symbiosis.finance/transactions/${transaction.from_chain_id}/${transaction.hash}`}
            target="_blank"
          >
            <MaximizeIcon className="opacity-40" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-3 rounded-[20px] p-[15px] h-[85px]',
        isContained && 'bg-background-tableRow',
      )}
    >
      <ExchangeTransactionToken
        tokenName={tokenIn.token.symbol}
        amount={Number(utils.formatUnits(String(Number(tokenIn.amount).toLocaleString('fullwide', {useGrouping:false})), tokenIn.token.decimals))}
        icon={String(findTokenIn?.icons?.small)}
        chainIcon={String(findTokenIn?.chain?.icons?.small)}
        directionName="You pay"
      />
      <ExchangeTransactionToken
        tokenName={tokenOut.token.symbol}
        amount={Number(utils.formatUnits(String(Number(tokenOut.amount).toLocaleString('fullwide', {useGrouping:false})), tokenOut.token.decimals))}
        icon={String(findTokenOut?.icons?.small)}
        chainIcon={String(findTokenOut?.chain?.icons?.small)}
        directionName="You recieve"
      />
      <div className="flex flex-col justify-between items-end">
        <Link
          href={`https://explorer.symbiosis.finance/transactions/${transaction.from_chain_id}/${transaction.hash}`}
          target="_blank"
          className="flex flex-row gap-[5px] items-center font-unbounded font-light"
        >
          <span>Transaction details</span> <MaximizeIcon />
        </Link>
        <Text textView={TextView.C4} className="!font-unbounded !font-light opacity-50">
          {dayjs(created_at).format('DD MMM YYYY HH:mm')}
        </Text>
      </div>
    </div>
  );
};
