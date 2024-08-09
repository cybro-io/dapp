import React from 'react';

import { utils } from 'ethers';
import {
  SwapExactInParams,
  CrosschainSwapExactInResult,
  Token,
  TokenAmount,
  BestPoolSwapping,
  ErrorCode,
} from 'symbiosis-js-sdk';

import { useSymbiosis } from '@/shared/lib';
import { statusError } from '@/entities/SwapToken';

export type SwapCalculateResult = CrosschainSwapExactInResult & {
  tokenAmountIn: TokenAmount;
  from: string;
  swapping: BestPoolSwapping;
};

interface SwapCalculateData {
  records: Record<string, { title: string; value: string }>;
  isLoadingCalculate: boolean;
  error?: string;
  calculate?: SwapCalculateResult;
}

type CalculateSwapProps = Pick<SwapExactInParams, 'tokenOut' | 'from' | 'to'> &
  Partial<Pick<SwapExactInParams, 'slippage' | 'deadline'>> & {
    tokenIn: Token;
    amount: string;
  };

export const useSwapCalculate = () => {
  const symbiosis = useSymbiosis();

  const [calculateData, setCalculateData] = React.useState<SwapCalculateData>({
    isLoadingCalculate: false,
    records: {},
  });

  const setCalculateDataWithPrev = (props: Partial<SwapCalculateData>) =>
    setCalculateData(prevState => ({ ...prevState, ...props }));

  const resetCalculate = () => setCalculateData({ records: {}, isLoadingCalculate: false });

  const fetchCalculateSwap = async ({
    amount,
    from,
    to,
    tokenOut,
    tokenIn,
    slippage = 300,
    deadline = Date.now() + 20 * 60,
  }: CalculateSwapProps) => {
    try {
      setCalculateDataWithPrev({
        records: {},
        error: undefined,
        isLoadingCalculate: true,
      });

      const tokenAmountIn = new TokenAmount(
        tokenIn,
        utils.parseUnits(amount, tokenIn.decimals).toString(),
      );

      if (!utils.isAddress(to) || !utils.isAddress(from)) {
        throw new Error('Incorrect address');
      }

      const swapping = symbiosis.bestPoolSwapping();

      const exactIn = await swapping.exactIn({
        tokenAmountIn: tokenAmountIn,
        tokenOut: tokenOut,
        from: from,
        to: to,
        slippage,
        deadline,
      });

      console.log('calculateSwap:', exactIn);

      const records: Record<string, { title: string; value: string }> = {};

      if (exactIn.fee || exactIn.extraFee) {
        const fee = exactIn.fee;
        const extraFee = exactIn.extraFee;
        let value = '';
        if (fee) {
          value = `${fee.toSignificant()}% ${fee.token.symbol}`;
        }

        if (extraFee) {
          value += `+ ${extraFee.toFixed()}% ${extraFee.token.symbol}`;
        }

        records.fee = {
          title: 'Estimated fee',
          value,
        };
      }

      if (exactIn.priceImpact) {
        records.priceImpact = {
          title: 'Price impact',
          value: `${exactIn.priceImpact.toFixed()}%`,
        };
      }

      if (exactIn.tokenAmountOutMin) {
        records.tokenAmountOutMin = {
          title: 'Minimum received',
          value: `${exactIn.tokenAmountOutMin.toSignificant()} ${tokenOut.symbol}`,
        };
      }

      setCalculateDataWithPrev({
        calculate: { ...exactIn, tokenAmountIn, from, swapping },
        records,
        isLoadingCalculate: false,
        error: undefined,
      });
    } catch (error) {
      console.error(error);
      const er = error as { message: string; code?: ErrorCode };
      if (er?.message || er?.code) {
        setCalculateDataWithPrev({
          records: {},
          error: er.code ? statusError[er.code] : er?.message,
          isLoadingCalculate: false,
        });
      }
    }
  };

  return { ...calculateData, fetchCalculateSwap, resetCalculate };
};
