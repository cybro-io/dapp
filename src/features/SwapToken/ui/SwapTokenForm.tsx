import React from 'react';

import { Skeleton } from '@nextui-org/react';
import { Token } from 'symbiosis-js-sdk';

import { getUniqueTokenId, InputAddress, SwapTokenCard } from '@/entities/SwapToken';
import { SwapSettingsButton } from '@/features/SwapSettings';
import { useExchangeTokenBalance } from '@/features/SwapToken/model/useExchangeTokenBalance';
import { Button, Chip, ChipViewType, SwapButton, Text, TextView } from '@/shared/ui';
import { AmountInput } from '@/shared/ui/AmountInput';

import { useExchangeSwap } from '../model/useExchangeSwap';

type SwapTokenProps = {
  features: {
    connectWallet: React.ReactElement;
    selectToken: (selectedTokenId: string, callback: (token: Token) => void) => void;
  };
};

export const SwapTokenForm = ({ features }: SwapTokenProps) => {
  const { form, isConnected, isDisabledSubmit, amountOutUsd, amountInUsd, calculateParams } =
    useExchangeSwap();

  const { isLoadingCalculate, records, error } = calculateParams;
  const values = form.values;

  const { balance: balanceIn, isLoading: isLoadingInBalance } = useExchangeTokenBalance(
    values.tokenIn,
  );
  const { balance: balanceOut, isLoading: isLoadingOutBalance } = useExchangeTokenBalance(
    values.tokenOut,
  );

  const showSelectTokenModal = (token: Token | null, setToken: (token: Token) => void) => {
    if (!token) return;

    features.selectToken(
      getUniqueTokenId(token.address, token.chainId, token.chainFromId),
      setToken,
    );
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit}>
      <SwapTokenCard
        token={values.tokenIn}
        balance={
          isLoadingInBalance ? (
            <Skeleton className="rounded-lg">
              <div className="h-[18px] w-20 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceIn
          )
        }
        onSelectTokenClick={() =>
          showSelectTokenModal(values.tokenIn, token => form.handleChangeToken(token, 'in'))
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
          {...form.register('amountIn')}
          usd={amountInUsd}
          max={balanceIn}
          showPercent
          onSelectPercent={percent => form.handleSetPercent(Number(balanceIn), percent)}
        />
      </SwapTokenCard>
      <SwapButton type="button" disabled={isLoadingCalculate} onClick={form.handleSwapDirection} />
      <SwapTokenCard
        token={values.tokenOut}
        balance={
          isLoadingOutBalance ? (
            <Skeleton className="rounded-lg">
              <div className="h-[18px] w-24 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceOut
          )
        }
        onSelectTokenClick={() =>
          showSelectTokenModal(values.tokenOut, token => form.handleChangeToken(token, 'out'))
        }
        title="To"
        footer={
          <div className="flex flex-row justify-between items-center">
            <Text textView={TextView.C4} className="opacity-60">
              Recipient
            </Text>
            <div className="max-w-[194px]">
              <InputAddress {...form.register('address')} onClear={() => form.setAddress('')} />
            </div>
          </div>
        }
      >
        <AmountInput
          label="You recieve"
          placeholder="0"
          {...form.register('amountOut')}
          disabled
          usd={amountOutUsd}
          max={balanceOut}
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

          <SwapSettingsButton
            onChangeSettings={form.handleChangeSettings}
            deadline={values.deadline}
            slippage={values.slippage}
          />
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
