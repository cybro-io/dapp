'use client';

import React from 'react';

import clsx from 'clsx';

import EnglishIcon from '@/shared/assets/flags/USA.svg';
import { ComponentWithProps } from '@/shared/types';
import { Dropdown, DropdownItem, DropdownView } from '@/shared/ui';

import { LanguageChangeItem } from './components';

type LanguageChangeProps = {};

export const LanguageChange: ComponentWithProps<LanguageChangeProps> = ({ className }) => {
  const languages: DropdownItem[] = [
    {
      key: 'en',
      label: <LanguageChangeItem label="EN" icon={<EnglishIcon />} />,
    },
  ];

  return <Dropdown className={clsx(className)} items={languages} viewType={DropdownView.Flat} />;
};
