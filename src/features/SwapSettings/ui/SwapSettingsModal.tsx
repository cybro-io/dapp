import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Input } from '@nextui-org/input';
import { Radio, RadioGroup } from '@nextui-org/react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { useSwapSettingsForm } from '@/features/SwapSettings';
import { Button, Modal, Text, TextView } from '@/shared/ui';

export type SwapSettingsModalProps = {
  defaultSlippage: number;
  defaultDeadline: number;
};

export const SwapSettingsModal = NiceModal.create<SwapSettingsModalProps>(
  ({ defaultSlippage, defaultDeadline }) => {
    const currentModal = NiceModal.useModal();

    const { register, isDisabledSubmit, handleSubmit, control } = useSwapSettingsForm({
      defaultSlippage,
      defaultDeadline,
    });

    const onSubmit = handleSubmit(data => {
      currentModal.resolve(data);
      currentModal.remove();
    });

    return (
      <Modal onClose={() => currentModal.remove()} classNames={{ base: 'max-w-[375px]' }}>
        <Modal.Header>Slippage Settings</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
            <Text textView={TextView.H5}>Slippage Tolerance</Text>

            <div className="inline-flex justify-between gap-4">
              <Controller
                name="slippage"
                control={control}
                render={({ field }) => (
                  <RadioGroup orientation="horizontal" {...field}>
                    <Radio
                      size="sm"
                      classNames={{
                        base: 'p-0 m-0',
                        wrapper: 'hidden',
                        labelWrapper: 'm-0',
                        label:
                          'px-2.5 py-0.5 group-data-[selected=false]:text-opacity-60 group-data-[selected=true]:text-black group-data-[selected=true]:bg-white rounded-full',
                      }}
                      value="1"
                    >
                      1.0%
                    </Radio>
                    <Radio
                      size="sm"
                      classNames={{
                        base: 'p-0 m-0',
                        wrapper: 'hidden',
                        labelWrapper: 'm-0',
                        label:
                          'px-2.5 py-0.5 group-data-[selected=false]:text-opacity-60 group-data-[selected=true]:text-black group-data-[selected=true]:bg-white rounded-full',
                      }}
                      value="1.5"
                    >
                      1.5%
                    </Radio>
                    <Radio
                      size="sm"
                      classNames={{
                        base: 'p-0 m-0',
                        wrapper: 'hidden',
                        labelWrapper: 'm-0',
                        label:
                          'px-2.5 py-0.5 group-data-[selected=false]:text-opacity-60 group-data-[selected=true]:text-black group-data-[selected=true]:bg-white rounded-full',
                      }}
                      value="2"
                    >
                      2.0%
                    </Radio>
                  </RadioGroup>
                )}
              />

              <Controller
                name="slippage"
                control={control}
                render={({ field }) => (
                  <Input
                    size="sm"
                    className="border-stroke-tableBorder flex-1"
                    radius="full"
                    classNames={{
                      inputWrapper: clsx(
                        'px-4 min-h-[24px] h-[24px]',
                        'bg-background-chips group-data-[focus=true]:bg-background-chips data-[hover=true]:bg-background-chips',
                        'outline outline-[1px] outline-stroke-tableBorder data-[hover=true]:outline-stroke-whiteBorder',
                      ),
                      input: 'font-poppins text-[12px]',
                    }}
                    placeholder="slippage"
                    endContent={<Text textView={TextView.C4}>%</Text>}
                    {...field}
                  />
                )}
              />
            </div>

            <Text textView={TextView.BP3} className="opacity-60">
              Slippage Tolerance is the maximum price change you're willing to accept for your trade
              to complete. If the price changes more than this, swaps will be handled specially.
            </Text>
            <div />
            <Text textView={TextView.H5}>On-chain Trades Deadline</Text>

            <Input
              size="sm"
              className="border-stroke-tableBorder"
              radius="full"
              classNames={{
                inputWrapper: clsx(
                  'px-4 min-h-[24px] h-[24px]',
                  'bg-background-chips group-data-[focus=true]:bg-background-chips data-[hover=true]:bg-background-chips',
                  'outline outline-[1px] outline-stroke-tableBorder data-[hover=true]:outline-stroke-whiteBorder',
                ),
                input: 'font-poppins text-[12px]',
              }}
              placeholder="min."
              endContent={<Text textView={TextView.C4}>Minutes</Text>}
              {...register('deadline')}
            />
            <Button disabled={isDisabledSubmit}>Apply changes</Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  },
);
