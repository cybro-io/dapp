'use client';

import React, { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Chip, ChipViewType, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './AmountInput.module.scss';
import { percentButtons } from './constants';

export type AmountInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  helperText?: string;
  label?: string;
  usd?: string | number | null;
  showPercent?: boolean;
  onSelectPercent?: (percent: number) => void;
};

export const AmountInput: ComponentWithProps<AmountInputProps> = React.forwardRef(
  (
    { onChange, onSelectPercent, max, helperText, usd, showPercent, ...props },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { onWheel, className, label } = props;
    const [selectedPercent, setSelectedPercent] = React.useState(0);

    const handlePercentChange = (percent: number) => {
      if (max) {
        setSelectedPercent(percent);
        onSelectPercent?.(percent);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSelectPercent?.(0);
      setSelectedPercent(0);
      onChange?.(event);
    };

    const numberInputOnWheelPreventChange = (event: React.WheelEvent<HTMLInputElement>) => {
      // Prevent the input value change
      event.preventDefault();

      // Prevent the page/container scrolling
      event.stopPropagation();

      onWheel?.(event);
    };

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Text className={styles.label} textView={TextView.C4}>
            {label}
          </Text>
        )}
        <div className={clsx(styles.inputContainer, !showPercent && '!border-none')}>
          <input
            className={clsx(className, styles.input)}
            type="number"
            {...props}
            ref={ref}
            onWheel={numberInputOnWheelPreventChange}
            onChange={handleChange}
          />
          {Boolean(usd) && <span className={styles.equal}>≈ ${formatUserMoney(usd)}</span>}
          {helperText && (
            <Chip viewType={ChipViewType.Warning} className="absolute -bottom-7">
              {helperText}
            </Chip>
          )}
        </div>
        {showPercent && (
          <div className={styles.percentButtons}>
            {percentButtons.map(({ title, value }) => {
              return (
                <button
                  type="button"
                  key={value}
                  className={clsx(
                    styles.percentButton,
                    value === selectedPercent && styles.percentButtonSelected,
                  )}
                  disabled={!max}
                  onClick={() => handlePercentChange(value)}
                >
                  {title}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
