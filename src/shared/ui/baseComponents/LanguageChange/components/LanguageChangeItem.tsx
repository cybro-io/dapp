import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './LanguageChangeItem.module.scss';

type LanguageChangeItemProps = {
  icon: React.ReactNode;
  label: string;
};

export const LanguageChangeItem: ComponentWithProps<LanguageChangeItemProps> = ({
  label,
  icon,
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      {icon}
      <span>{label}</span>
    </div>
  );
};
