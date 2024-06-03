'use client';

import React from 'react';

import clsx from 'clsx';

import { useModal } from '@/app/providers';
import { ComponentWithProps } from '@/shared/types';
import { IconButton, Text } from '@/shared/ui';

import CloseIcon from './assets/icons/close.svg';
import styles from './ModalLayout.module.scss';

type ModalLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const ModalLayout: ComponentWithProps<ModalLayoutProps> = ({
  children,
  title,
  className,
}) => {
  const { closeModal } = useModal();
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Text className={styles.title}>{title}</Text>
          <IconButton className={styles.closeButton} icon={<CloseIcon />} onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  );
};
