import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { utils } from 'ethers';
import { ChainId, getTokenAmountUsd, getTokenPriceUsd, TokenAmount } from 'symbiosis-js-sdk';

import { useSwapTokens } from '@/entities/SwapToken';
import { useGetTokenBalance, useSymbiosis } from '@/shared/lib';

import { useExchangeSwapForm } from '../model/useExchangeSwapForm';

import { useSwap } from './useSwap';
import { useSwapCalculate } from './useSwapCalculate';

export const useExchangeSwap = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address: defaultAddress, isConnected } = useWeb3ModalAccount();

  const { tokens } = useSwapTokens();
  const { fetchCalculateSwap, records, error, calculate, isLoadingCalculate, resetCalculate } =
    useSwapCalculate();
  const { swap, isLoadingSwap, subscribeSuccessSwap } = useSwap();

  const {
    form,
    handleChangeToken,
    handleSwapDirection,
    debouncedAmountIn,
    debouncedAddress,
    setAmountOut,
    setPriceInUsd,
    setPriceOutUsd,
    handleSetPercent,
    setAddress,
    setBalanceIn,
    setBalanceOut,
    setAmountIn,
  } = useExchangeSwapForm({
    initialTokenIn:
      tokens.find(
        ({ symbol, chainId }) => symbol === 'USDB' && chainId === ChainId.BLAST_MAINNET,
      ) ?? tokens[0],
    initialTokenOut:
      tokens.find(({ symbol, chainId }) => symbol === 'ETH' && chainId === ChainId.BLAST_MAINNET) ??
      tokens[0],
    onCalculate: () => handleCalculateSwap(),
    onSubmit: () => {
      if (error || !calculate || !walletProvider) return;
      swap({ walletProvider, calculate });
      resetCalculate({});
      setAmountOut('');
      setAmountIn('');
    },
  });

  const {
    slippage,
    deadline,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    priceOutUsd,
    priceInUsd,
    balanceOut,
    balanceIn,
  } = form.values;

  // Amount usd from
  const amountInUsd = React.useMemo(() => {
    if (!tokenIn || !priceInUsd || Number(amountIn) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenIn,
      utils.parseUnits(String(amountIn), tokenIn.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceInUsd);
  }, [tokenIn, priceInUsd, amountIn]);

  // Amount usd to
  const amountOutUsd = React.useMemo(() => {
    if (!tokenOut || !priceOutUsd || Number(amountOut) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenOut,
      utils.parseUnits(String(amountOut), tokenOut.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceOutUsd);
  }, [tokenOut, priceOutUsd, amountOut]);

  // Reset calculate
  React.useEffect(() => {
    resetCalculate({});
    setAmountOut('');
  }, [tokenIn, tokenOut]);

  // Calculate swap
  const handleCalculateSwap = () => {
    if (!defaultAddress) return;

    fetchCalculateSwap({
      tokenIn,
      tokenOut,
      to: String(debouncedAddress || defaultAddress),
      from: defaultAddress ?? '',
      amount: String(debouncedAmountIn),
      slippage,
      deadline,
    }).then(({ calculate }) => {
      setAmountOut(calculate.tokenAmountOut.toSignificant());
    });
  };

  React.useEffect(() => {
    getTokenPriceUsd(tokenOut).then(setPriceOutUsd).catch(setPriceOutUsd);
    getTokenPriceUsd(tokenIn).then(setPriceInUsd).catch(setPriceInUsd);
  }, []);

  const symbiosis = useSymbiosis();

  const { isLoading: isLoadingInBalance, fetchBalance: fetchInBalance } = useGetTokenBalance();
  const { isLoading: isLoadingOutBalance, fetchBalance: fetchOutBalance } = useGetTokenBalance();

  const getTokensBalance = () => {
    if (!defaultAddress) return;

    const providerIn = symbiosis.providers.get(tokenIn.chainId);
    if (providerIn) {
      fetchInBalance(tokenIn, providerIn, defaultAddress).then(setBalanceIn).catch(setBalanceIn);
    }

    const providerOut = symbiosis.providers.get(tokenOut.chainId);
    if (providerOut) {
      fetchOutBalance(tokenOut, providerOut, defaultAddress)
        .then(setBalanceOut)
        .catch(setBalanceOut);
    }
  };

  React.useEffect(() => {
    getTokensBalance();
  }, [defaultAddress, tokenOut, tokenIn]);

  const isDisabledSubmit = isLoadingCalculate || isLoadingSwap || !form.isValid || Boolean(error);

  const handleChangeSettings = ({ deadline, slippage }: { slippage: number; deadline: number }) => {
    console.log('new settings', { deadline, slippage });

    form.setFieldValue('slippage', slippage);
    form.setFieldValue('deadline', deadline);
  };

  React.useEffect(() => {
    const subscriber = subscribeSuccessSwap(() => {
      getTokensBalance();
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, []);
  return {
    onSubmit: form.handleSubmit,
    register: form.register,
    handleChangeSettings,
    setAddress,
    tokenIn,
    tokenOut,
    handleSwapDirection,
    isConnected,
    handleChangeToken,
    records,
    error,
    amountInUsd,
    amountOutUsd,
    handleSetPercent,
    isDisabledSubmit,
    isLoadingCalculate,
    balanceIn,
    balanceOut,
    isLoadingInBalance,
    isLoadingOutBalance,
  };
};
