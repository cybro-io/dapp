import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SwapSettings = {
  slippage: number;
  deadline: number;
};

type UseSwapSettingsProps = {
  defaultSlippage: number;
  defaultDeadline: number;
};

const validationSchema = yup.object().shape({
  slippage: yup.number().typeError('Invalid value').required().min(0.2).max(100),
  deadline: yup.number().typeError('Invalid value').required().min(5).max(60),
});

export const useSwapSettingsForm = ({ defaultSlippage, defaultDeadline }: UseSwapSettingsProps) => {
  const { setValue, register, formState, handleSubmit, control } = useForm({
    defaultValues: {
      slippage: String(defaultSlippage),
      deadline: String(defaultDeadline),
    },
    resolver: yupResolver<any>(validationSchema),
  });

  React.useEffect(() => {
    setValue('slippage', defaultSlippage);
    setValue('deadline', defaultDeadline);
  }, [defaultDeadline, defaultSlippage, setValue]);

  const isDisabledSubmit = !formState.isValid;

  return { setValue, register, isDisabledSubmit, handleSubmit, control };
};
