import React from 'react';

import clsx from 'clsx';

import { DepositCalculator, PeriodTab } from '@/entities/DepositCalculator';
import { DepositWithdrawInput } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { YieldSwitchOptions } from '@/shared/const';
import {
  useBalance,
  useDeposit,
  useWithdraw,
  useWithdrawCalculator,
  useDepositCalculator,
} from '@/shared/hooks';
import { ComponentWithProps, Nullable, Token, Vault } from '@/shared/types';
import { debounce, formatMoney, VaultCurrency } from '@/shared/utils';

import styles from './YieldCalculatorBody.module.scss';

type YieldCalculatorProps = {
  vaultId: number;
  tokenIcon: string;
  apy: number;
  vaultContract: Nullable<Vault>;
  tokenContract: Nullable<Token>;
  currency: VaultCurrency;
  actionType: YieldSwitchOptions;
  chainId: number;
  chain: string;
};

export const YieldCalculatorBody: ComponentWithProps<YieldCalculatorProps> = ({
  vaultId,
  tokenIcon,
  apy,
  vaultContract,
  tokenContract,
  actionType,
  currency,
  chainId,
  chain,
  className,
}) => {
  const [amount, setAmount] = React.useState<string>('0');
  const [period, setPeriod] = React.useState<PeriodTab>(PeriodTab.Year);
  const [selectedPercent, setSelectedPercent] = React.useState<number | null>(null);
  const { balance, refetchBalance, vaultDepositUsd, vaultDeposit } = useBalance(
    tokenContract,
    vaultContract,
    chainId,
    currency,
  );
  const { yourWithdraw, yourWithdrawUsd, currentRate, timer } = useWithdrawCalculator(
    vaultContract,
    amount,
    currency,
    chainId,
  );
  const {
    availableFundsUsd: depositAvailableFundsUsd,
    entryAmountUsd,
    apy: currentApy,
    text,
    profitUsd,
    profitTokens,
    balanceAfter,
    balanceAfterText,
  } = useDepositCalculator(amount, balance, currency, chainId, period, apy);
  const {
    deposit,
    isLoading: isDepositLoading,
    buttonMessage: depositButtonMessage,
  } = useDeposit(currency, vaultContract, tokenContract, vaultId);
  const {
    withdraw,
    isLoading: isWithdrawLoading,
    buttonMessage: withdrawButtonMessage,
  } = useWithdraw(currency, vaultContract, tokenContract, vaultId);

  const availableFundsUsd = React.useMemo(() => {
    if (actionType === YieldSwitchOptions.Withdraw) {
      return vaultDepositUsd;
    } else {
      return depositAvailableFundsUsd;
    }
  }, [actionType, depositAvailableFundsUsd, vaultDepositUsd]);

  const userValueUsd = React.useMemo(() => {
    if (actionType === YieldSwitchOptions.Withdraw) {
      return yourWithdrawUsd;
    } else {
      return entryAmountUsd;
    }
  }, [actionType, entryAmountUsd, yourWithdrawUsd]);

  const getIsSubmitButtonDisabled = React.useCallback(() => {
    const availableBalance = actionType === YieldSwitchOptions.Deposit ? balance : vaultDeposit;

    if (availableBalance === null) {
      return true;
    }

    return (
      !amount ||
      Number(amount) === 0 ||
      Number(amount) > availableBalance ||
      isDepositLoading ||
      isWithdrawLoading
    );
  }, [actionType, balance, vaultDeposit, amount, isDepositLoading, isWithdrawLoading]);

  const isSubmitButtonDisabled = getIsSubmitButtonDisabled();

  const debouncedTrackEvent = React.useMemo(
    () => debounce(() => Mixpanel.track(MixpanelEvent.DepositAmountChangedManually), 3000),
    [],
  );

  const onAmountChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value;

      // Prevent scientific notation and limit the input to digits and a single decimal point
      if (!isNaN(Number(inputValue))) {
        // Avoid scientific notation for very large numbers by formatting as a string
        if (inputValue.includes('e') || inputValue.includes('E')) {
          const parts = inputValue.split(/[eE]/);
          const number = parts[0];
          const exponent = Number(parts[1]);
          inputValue = (Number(number) * Math.pow(10, exponent)).toFixed(0);
        }

        // Allow only digits and a single decimal point
        inputValue = inputValue.replace(/[^0-9.]/g, '');

        // Remove leading zeros and prevent multiple decimal points
        const cleanedValue = inputValue.split('.').reduce((acc, part, index) => {
          return index === 0 ? String(Number(part)) : acc + '.' + part;
        }, '');

        debouncedTrackEvent();
        setSelectedPercent(null);
        setAmount(cleanedValue);
      }
    },
    [debouncedTrackEvent],
  );

  const onPercentButtonClick = React.useCallback(
    (value: number) => {
      if (balance === null || vaultDeposit === null) {
        return;
      }

      if (actionType === YieldSwitchOptions.Deposit) {
        setAmount(formatMoney(balance * value, 8));
      }

      if (actionType === YieldSwitchOptions.Withdraw) {
        setAmount(formatMoney(vaultDeposit * value, 8));
      }

      Mixpanel.track(MixpanelEvent.DepositAmountChangedPreset);
      setSelectedPercent(value);
    },
    [actionType, balance, vaultDeposit],
  );

  const submitDeposit = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    try {
      await deposit(amount);
      setAmount('0');
      refetchBalance();
    } catch (error) {
      console.error(error);
    }
  }, [amount, deposit, refetchBalance]);

  const submitWithdraw = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    try {
      await withdraw(amount);
      setAmount('0');
      refetchBalance();
    } catch (error) {
      console.error(error);
    }
  }, [amount, refetchBalance, withdraw]);

  return (
    <div className={clsx(styles.root, className)}>
      <DepositWithdrawInput
        currency={currency}
        tokenIcon={tokenIcon}
        activeTab={actionType}
        userValue={amount}
        userValueUsd={userValueUsd}
        setUserValue={onAmountChange}
        userBalance={balance}
        availableFunds={vaultDeposit}
        availableFundsUsd={availableFundsUsd}
        selectedPercent={selectedPercent}
        setSelectedPercent={onPercentButtonClick}
        chain={chain}
      />

      {actionType === YieldSwitchOptions.Deposit && (
        <DepositCalculator
          isButtonDisabled={isSubmitButtonDisabled}
          apy={currentApy}
          deposit={submitDeposit}
          buttonMessage={depositButtonMessage}
          setPeriod={setPeriod}
          balanceAfter={balanceAfter}
          balanceAfterText={balanceAfterText}
          profitTokens={profitTokens}
          profitUsd={profitUsd}
          text={text}
        />
      )}
      {actionType === YieldSwitchOptions.Withdraw && (
        <WithdrawCalculator
          withdraw={submitWithdraw}
          timer={timer}
          currentRate={currentRate}
          isButtonDisabled={isSubmitButtonDisabled}
          buttonMessage={withdrawButtonMessage}
          amountToWithdraw={yourWithdraw}
          amountToWithdrawUsd={yourWithdrawUsd}
          tokenIcon={tokenIcon}
        />
      )}
    </div>
  );
};
