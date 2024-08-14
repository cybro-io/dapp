'use client';

import React, { ButtonHTMLAttributes } from 'react';

import {
  Dropdown as NextUIDropdown,
  DropdownItem as NextUIDropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import clsx from 'clsx';

import ArrowIcon from '@/shared/assets/icons/arrow-dropdown-up.svg';
import ChevronIcon from '@/shared/assets/icons/chevron-up.svg';
import { ComponentWithProps } from '@/shared/types';

import { DropdownView } from './const';
import styles from './Dropdown.module.scss';
import { DropdownItem } from './types';

type DropdownProps = {
  items: DropdownItem[];
  buttonContent?: string | React.ReactNode;
  viewType?: DropdownView;
};

const DropdownViewToArrow: Record<DropdownView, React.FC> = {
  [DropdownView.Rounded]: ChevronIcon,
  [DropdownView.Flat]: ArrowIcon,
};

type DropdownButtonProps = Pick<DropdownProps, 'viewType'> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const DropdownButton = React.forwardRef(
  (
    { children, viewType = DropdownView.Rounded, className, ...props }: DropdownButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => (
    <button {...props} className={clsx(className, styles.button, styles[viewType])} ref={ref}>
      {children}
    </button>
  ),
);

export const Dropdown: ComponentWithProps<DropdownProps> = ({
  items,
  buttonContent,
  viewType = DropdownView.Rounded,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const ArrowIcon = DropdownViewToArrow[viewType];

  return (
    <NextUIDropdown className={clsx(className)} onOpenChange={setIsOpened}>
      <DropdownTrigger>
        <DropdownButton>
          {buttonContent ?? items[0].label}
          <div className={clsx(styles.arrow, isOpened && styles.isOpened)}>
            <ArrowIcon />
          </div>
        </DropdownButton>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {item => (
          <NextUIDropdownItem
            key={item.key}
            color={item.key === 'delete' ? 'danger' : 'default'}
            className={item.key === 'delete' ? 'text-danger' : ''}
          >
            {item.label}
          </NextUIDropdownItem>
        )}
      </DropdownMenu>
    </NextUIDropdown>
  );
};
