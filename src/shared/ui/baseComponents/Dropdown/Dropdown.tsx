'use client';

import React from 'react';

import {
  Dropdown as NextUIDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import clsx from 'clsx';

import ArrowIcon from '@/shared/assets/icons/arrow-dropdown-up.svg';
import ChevronIcon from '@/shared/assets/icons/chevron-up.svg';
import { ComponentWithProps } from '@/shared/types';

import { DropdownView } from './const';
import styles from './Dropdown.module.scss';

type DropdownProps = {
  buttonContent: string | React.ReactNode;
  viewType?: DropdownView;
};

const DropdownViewToArrow: Record<DropdownView, React.FC> = {
  [DropdownView.Rounded]: ChevronIcon,
  [DropdownView.Flat]: ArrowIcon,
};

export const Dropdown: ComponentWithProps<DropdownProps> = ({
  buttonContent,
  viewType = DropdownView.Rounded,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const ArrowIcon = DropdownViewToArrow[viewType];

  const items = [
    {
      key: 'new',
      label: <p>Hello</p>,
    },
    {
      key: 'copy',
      label: 'Copy link',
    },
    {
      key: 'edit',
      label: 'Edit file',
    },
    {
      key: 'delete',
      label: 'Delete file',
    },
  ];

  return (
    <NextUIDropdown onOpenChange={setIsOpened}>
      <DropdownTrigger>
        <button className={clsx(styles.button, styles[viewType])}>
          {buttonContent}
          <div className={clsx(styles.arrow, isOpened && styles.isOpened)}>
            <ArrowIcon />
          </div>
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {item => (
          <DropdownItem
            key={item.key}
            color={item.key === 'delete' ? 'danger' : 'default'}
            className={item.key === 'delete' ? 'text-danger' : ''}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </NextUIDropdown>
  );
};
