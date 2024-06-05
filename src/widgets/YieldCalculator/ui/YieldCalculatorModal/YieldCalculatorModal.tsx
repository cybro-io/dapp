import React from 'react';

import { useModal } from '@/app/providers';
import { DepositCalculator } from '@/entities/DepositCalculator';
import { DepositWithdrawInput } from '@/entities/DepositWithdraw';
import { WithdrawCalculator } from '@/entities/WithdrawCalculator';
import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';

type YieldCalculatorModalProps = {
  activeTab: YieldSwitchOptions;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const { props } = useModal();
  const [userValue, setUserValue] = React.useState<number>(0);
  const type: YieldSwitchOptions = props.activeTab;

  const title = type === YieldSwitchOptions.Deposit ? 'Vault Deposit' : 'Vault Withdraw';

  return (
    <ModalLayout title={title}>
      <DepositWithdrawInput userValue={userValue} setUserValue={setUserValue} activeTab={type} />
      {type === YieldSwitchOptions.Deposit && <DepositCalculator />}
      {type === YieldSwitchOptions.Withdraw && <WithdrawCalculator />}
    </ModalLayout>
  );
};
