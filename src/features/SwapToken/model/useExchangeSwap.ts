import React from 'react';

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { utils } from 'ethers';
import { getTokenAmountUsd, getTokenPriceUsd, TokenAmount } from 'symbiosis-js-sdk';

import { useSwapTokens } from '@/entities/SwapToken';
import { getAvailableBalance, useSymbiosis } from '@/shared/lib';

import { useExchangeSwapForm } from '../model/useExchangeSwapForm';

import { useSwap } from './useSwap';
import { useSwapCalculate } from './useSwapCalculate';

export const useExchangeSwap = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address: defaultAddress, isConnected } = useWeb3ModalAccount();

  const { tokens } = useSwapTokens();
  const { fetchCalculateSwap, records, error, calculate, isLoadingCalculate, resetCalculate } =
    useSwapCalculate();
  const { swap, isLoadingSwap } = useSwap();

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
    values,
    setAddress,
    setBalanceIn,
    setBalanceOut,
    setAmountIn,
  } = useExchangeSwapForm({
    initialTokenIn: tokens[0],
    initialTokenOut: tokens[1],
  });

  const { control } = form;
  const { tokenIn, tokenOut, amountIn, amountOut, priceOutUsd, priceInUsd, balanceOut, balanceIn } =
    values;

  // Amount usd from
  const amountInUsd = React.useMemo(() => {
    if (!tokenIn || !priceInUsd || Number(amountIn) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenIn,
      utils.parseUnits(amountIn, tokenIn.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceInUsd);
  }, [tokenIn, priceInUsd, amountIn]);

  // Amount usd to
  const amountOutUsd = React.useMemo(() => {
    if (!tokenOut || !priceOutUsd || Number(amountOut) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenOut,
      utils.parseUnits(amountOut, tokenOut.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceOutUsd);
  }, [tokenOut, priceOutUsd, amountOut]);

  // Reset calculate
  React.useEffect(() => {
    resetCalculate();
    setAmountOut('');
  }, [tokenIn, tokenOut]);

  // When success calculate then change amount out
  React.useEffect(() => {
    if (calculate) {
      setAmountOut(calculate.tokenAmountOut.toSignificant());
    }
  }, [calculate]);

  // Calculate swap when changes: amountIn, tokenIn, tokenOut or address
  React.useEffect(() => {
    if (!form.formState.isValid || !defaultAddress) return;

    fetchCalculateSwap({
      tokenIn,
      tokenOut,
      to: String(debouncedAddress || defaultAddress),
      from: defaultAddress ?? '',
      amount: debouncedAmountIn,
    });
  }, [
    form.formState.isValid,
    debouncedAmountIn,
    tokenIn,
    tokenOut,
    defaultAddress,
    debouncedAddress,
  ]);

  React.useEffect(() => {
    getTokenPriceUsd(tokenOut).then(setPriceOutUsd).catch(setPriceOutUsd);
    getTokenPriceUsd(tokenIn).then(setPriceInUsd).catch(setPriceInUsd);
  }, []);

  const symbiosis = useSymbiosis();
  React.useEffect(() => {
    if (!defaultAddress) return;

    const providerIn = symbiosis.providers.get(tokenIn.chainId);
    if (providerIn) {
      getAvailableBalance(tokenIn, providerIn, defaultAddress)
        .then(setBalanceIn)
        .catch(setBalanceIn);
    }

    const providerOut = symbiosis.providers.get(tokenOut.chainId);
    if (providerOut) {
      getAvailableBalance(tokenOut, providerOut, defaultAddress)
        .then(setBalanceOut)
        .catch(setBalanceOut);
    }
  }, [defaultAddress, tokenOut, tokenIn]);

  const onSubmit = form.handleSubmit(() => {
    if (error || !calculate || !walletProvider) return;

    swap({ walletProvider, calculate });
    resetCalculate();
    setAmountOut('');
    setAmountIn('');
  });

  const isDisabledSubmit =
    isLoadingCalculate || isLoadingSwap || !form.formState.isValid || Boolean(error);

  return {
    setAddress,
    control,
    tokenIn,
    tokenOut,
    handleSwapDirection,
    isConnected,
    handleChangeToken,
    records,
    error,
    amountInUsd,
    amountOutUsd,
    onSubmit,
    handleSetPercent,
    isDisabledSubmit,
    isLoadingCalculate,
    balanceIn,
    balanceOut,
  };
};
