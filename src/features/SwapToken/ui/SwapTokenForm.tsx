import React from 'react';

import { Token } from 'symbiosis-js-sdk';

import { getUniqueTokenId, SwapTokenCard } from '@/entities/SwapToken';
import { InputAddress } from '@/entities/SwapToken';
import { SwapSettingsButton } from '@/features/SwapSettings';
import { Button, Chip, ChipViewType, SwapButton, Text, TextView } from '@/shared/ui';
import { AmountInput } from '@/shared/ui/AmountInput';

import { useExchangeSwap } from '../model/useExchangeSwap';
import { Skeleton } from '@nextui-org/react';

type SwapTokenProps = {
  features: {
    connectWallet: React.ReactElement;
    selectToken: (selectedTokenId: string, callback: (token: Token) => void) => void;
  };
};

export const SwapTokenForm = ({ features }: SwapTokenProps) => {
  const {
    register,
    tokenIn,
    tokenOut,
    handleSwapDirection,
    isConnected,
    handleChangeToken,
    isDisabledSubmit,
    isLoadingCalculate,
    records,
    error,
    amountOutUsd,
    amountInUsd,
    onSubmit,
    balanceOut,
    balanceIn,
    handleSetPercent,
    setAddress,
    handleChangeSettings,
    isLoadingOutBalance,
    isLoadingInBalance,
  } = useExchangeSwap();

  const showSelectTokenModal = (token: Token | null, setToken: (token: Token) => void) => {
    if (!token) return;

    features.selectToken(
      getUniqueTokenId(token.address, token.chainId, token.chainFromId),
      setToken,
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <SwapTokenCard
        token={tokenIn}
        balance={
          isLoadingInBalance ? (
            <Skeleton classNames="rounded-lg">
              <div className="h-[18px] w-20 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceIn
          )
        }
        onSelectTokenClick={() =>
          showSelectTokenModal(tokenIn, token => handleChangeToken(token, 'in'))
        }
        title="From"
        footer={
          <div className="flex flex-row justify-between items-center">
            <Text textView={TextView.C4} className="opacity-60">
              Sender
            </Text>
            <Text textView={TextView.BP3}>Current Wallet</Text>
          </div>
        }
      >
        <AmountInput
          placeholder="0"
          label="You send"
          {...register('amountIn')}
          usd={amountInUsd}
          max={balanceIn}
          showPercent
          onSelectPercent={handleSetPercent}
        />
      </SwapTokenCard>
      <SwapButton type="button" disabled={isLoadingCalculate} onClick={handleSwapDirection} />
      <SwapTokenCard
        token={tokenOut}
        balance={
          isLoadingOutBalance ? (
            <Skeleton classNames="rounded-lg">
              <div className="h-[18px] w-24 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceOut
          )
        }
        onSelectTokenClick={() =>
          showSelectTokenModal(tokenOut, token => handleChangeToken(token, 'out'))
        }
        title="To"
        footer={
          <div className="flex flex-row justify-between items-center">
            <Text textView={TextView.C4} className="opacity-60">
              Recipient
            </Text>
            <div className="max-w-[194px]">
              <InputAddress {...register('address')} onClear={() => setAddress('')} />
            </div>
          </div>
        }
      >
        <AmountInput
          label="You recieve"
          placeholder="0"
          {...register('amountOut')}
          disabled
          usd={amountOutUsd}
          max={balanceOut}
          onSelectPercent={handleSetPercent}
        />
      </SwapTokenCard>

      <div className="relative bg-button-secondary-defaultBg w-full rounded-2xl pt-4 px-1 pb-1 flex flex-col gap-4">
        {error && (
          <Chip
            viewType={ChipViewType.Warning}
            className="absolute -top-[14px] left-0 right-0 mx-auto w-[calc(100%-32px)]"
          >
            {error}
          </Chip>
        )}

        <div className="flex flex-row gap-4 justify-between px-3">
          <div className="flex flex-col gap-2.5">
            {Object.values(records).map(({ title, value }) => (
              <div key={title} className="inline-flex items-center gap-1">
                <Text textView={TextView.C1} className="opacity-80">
                  {title}
                </Text>
                <Text textView={TextView.C2}>{value}</Text>
              </div>
            ))}
          </div>

          <SwapSettingsButton onChangeSettings={handleChangeSettings} />
        </div>

        {isConnected && (
          <Button disabled={isDisabledSubmit} type="submit">
            {isLoadingCalculate ? 'Finding best rates...' : 'Swap'}
          </Button>
        )}
        {!isConnected && features.connectWallet}
      </div>
    </form>
  );
};
