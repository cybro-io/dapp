'use client';

import React from 'react';

import { Divider } from '@nextui-org/react';
import clsx from 'clsx';

import { BaseLayout } from '@/app/layouts';
import { useWeb3ModalAccount } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';
import { ExchangeSwap } from '@/widgets/ExchangeSwap';
import { Hero } from '@/widgets/Hero';
import { SwapTransactions } from '@/widgets/SwapTransactions/ui/SwapTransactions';

import styles from './ExchangePage.module.scss';

export const ExchangePage = () => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <BaseLayout>
      <Hero />
      <div className="lg:px-[38px] mt-5 lg:-mt-[22px] flex flex-col-reverse lg:flex-row justify-center gap-5 lg:gap-[38px] relative">
        {!isConnected && (
          <div
            className={clsx(
              styles.exchangeBg,
              'lg:w-[753px] lg:h-[533px] w-full h-[455px]',
            )}
          >
            <div
              className={clsx(
                'w-fit text-center lg:text-left lg:w-[307px] flex flex-col gap-3 lg:ml-[60px] lg:mt-10',
              )}
            >
              <Text textView={TextView.H4}>
                Complete your first Swap or Exchange to view your transaction
                history here
              </Text>
              <Text textView={TextView.P2} className="opacity-60">
                This screen will display a record of all your Swap and Exchange
                operations
              </Text>
            </div>
          </div>
        )}

        {isConnected && <SwapTransactions />}

        <Divider orientation="vertical" className="h-[766px] hidden lg:block" />
        <ExchangeSwap />
      </div>
    </BaseLayout>
  );
};
