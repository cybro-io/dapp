import React from 'react';

import { Input } from '@nextui-org/input';
import clsx from 'clsx';
import { Control, useController } from 'react-hook-form';

import { truncateMiddle } from '@/shared/lib';
import { DropdownButton } from '@/shared/ui';

type InputAddressProps = {
  name: string;
  control: Control<any, any>;
  onClear?: () => void;
};

export const InputAddress = ({ control, name, onClear }: InputAddressProps) => {
  const { field } = useController({ name, control });

  const [isEditing, setIsEditing] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const renderValue = React.useMemo(
    () => (isFocused ? field.value : truncateMiddle(field.value)),
    [field.value, isFocused],
  );

  if (!field.value && !isEditing) {
    return (
      <DropdownButton
        type="button"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Current Wallet
      </DropdownButton>
    );
  }

  return (
    <Input
      size="sm"
      className="border-stroke-tableBorder"
      radius="full"
      classNames={{
        inputWrapper: clsx(
          'px-4 min-h-[30px] h-[30px]',
          'bg-background-chips group-data-[focus=true]:bg-background-chips data-[hover=true]:bg-background-chips',
          'outline outline-[1px] outline-stroke-tableBorder data-[hover=true]:outline-stroke-whiteBorder',
        ),
        input: 'font-poppins text-[13px]',
      }}
      placeholder="Enter the wallet address"
      {...field}
      value={renderValue}
      isClearable
      onClear={() => {
        setIsEditing(!isEditing);
        onClear?.();
      }}
      onFocusChange={isFocused => {
        setIsFocused(isFocused);
        if (!isFocused && !field.value) {
          setIsEditing(false);
        }
      }}
    />
  );
};
