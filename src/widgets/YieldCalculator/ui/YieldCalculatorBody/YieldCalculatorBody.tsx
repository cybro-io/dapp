import React from 'react';

import clsx from 'clsx';

import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { YieldSwitchOptions } from '@/shared/const';
import { useBalances, useDeposit, useWithdraw, useWithdrawCalculator } from '@/shared/hooks';
import { useDepositCalculator } from '@/shared/hooks/vault/useDepositCalculator';
import { ComponentWithProps, Nullable, Vault } from '@/shared/types';
import { debounce, formatMoney, getUserBalanceForVault, VaultCurrency } from '@/shared/utils';

import styles from './YieldCalculatorBody.module.scss';

type YieldCalculatorProps = {
  vaultId: number;
  tokenIcon: string;
  apy: number;
  vaultContract: Nullable<Vault>;
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
  actionType,
  currency,
  chainId,
  chain,
  className,
}) => {
  const [amount, setAmount] = React.useState<string>();
  const [selectedPercent, setSelectedPercent] = React.useState<number | null>(null);
  const { usdbBalance, wethBalance, wbtcBalance } = useBalances();
  const balance = getUserBalanceForVault(currency, usdbBalance, wethBalance, wbtcBalance);
  const {
    availableFunds,
    availableFundsUsd: withDrawAvailableFundsUsd,
    yourWithdraw,
    yourWithdrawUsd,
    currentRate,
    timer,
  } = useWithdrawCalculator(vaultContract, amount, currency, chainId);
  const { availableFundsUsd: depositAvailableFundsUsd, entryAmountUsd } = useDepositCalculator(
    amount,
    balance,
    currency,
    chainId,
  );
  const {
    deposit,
    isLoading: isDepositLoading,
    txError: depositError,
    buttonMessage: depositButtonMessage,
  } = useDeposit(currency, vaultContract, vaultId);
  const {
    withdraw,
    isLoading: isWithdrawLoading,
    txError: withdrawError,
    buttonMessage: withdrawButtonMessage,
  } = useWithdraw(currency, vaultContract, vaultId);

  const availableFundsUsd = React.useMemo(() => {
    if (actionType === YieldSwitchOptions.Withdraw) {
      return withDrawAvailableFundsUsd;
    } else {
      return depositAvailableFundsUsd;
    }
  }, [actionType, depositAvailableFundsUsd, withDrawAvailableFundsUsd]);

  const userValueUsd = React.useMemo(() => {
    if (actionType === YieldSwitchOptions.Withdraw) {
      return yourWithdrawUsd;
    } else {
      return entryAmountUsd;
    }
  }, [actionType, entryAmountUsd, yourWithdrawUsd]);

  const getIsSubmitButtonDisabled = React.useCallback(() => {
    const availableBalance = actionType === YieldSwitchOptions.Deposit ? balance : availableFunds;

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
  }, [actionType, balance, availableFunds, amount, isDepositLoading, isWithdrawLoading]);

  const isSubmitButtonDisabled = getIsSubmitButtonDisabled();

  const debouncedTrackEvent = React.useMemo(
    () => debounce(() => Mixpanel.track(MixpanelEvent.DepositAmountChangedManually), 3000),
    [],
  );

  const onAmountChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only digits and a single decimal point
      const inputValue = event.target.value.replace(/[^0-9.]/g, '');

      // Remove leading zeros and prevent multiple decimal points
      const cleanedValue = inputValue.split('.').reduce((acc, part, index) => {
        return index === 0 ? String(Number(part)) : acc + '.' + part;
      }, '');

      debouncedTrackEvent();

      setSelectedPercent(null);
      setAmount(cleanedValue);
    },
    [debouncedTrackEvent],
  );

  const onPercentButtonClick = React.useCallback(
    (value: number) => {
      if (balance === null || availableFunds === null) {
        return;
      }

      if (actionType === YieldSwitchOptions.Deposit) {
        setAmount(formatMoney(balance * value, 6));
      }

      if (actionType === YieldSwitchOptions.Withdraw) {
        setAmount(formatMoney(availableFunds * value, 6));
      }

      Mixpanel.track(MixpanelEvent.DepositAmountChangedPreset);
      setSelectedPercent(value);
    },
    [actionType, balance, availableFunds],
  );

  const submitDeposit = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    await deposit(amount);
  }, [deposit, amount]);

  const submitWithdraw = React.useCallback(async () => {
    if (!amount) {
      return;
    }

    await withdraw(amount);
  }, [withdraw, amount]);

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
        availableFunds={availableFunds}
        availableFundsUsd={availableFundsUsd}
        selectedPercent={selectedPercent}
        setSelectedPercent={onPercentButtonClick}
        chain={chain}
      />

      {actionType === YieldSwitchOptions.Deposit && (
        <DepositCalculator
          isButtonDisabled={isSubmitButtonDisabled}
          apy={apy}
          deposit={submitDeposit}
          buttonMessage={depositButtonMessage}
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
