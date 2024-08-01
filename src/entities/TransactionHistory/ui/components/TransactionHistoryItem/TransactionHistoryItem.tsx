import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import DownIcon from '@/shared/assets/icons/chevron-up.svg';
import { ComponentWithProps } from '@/shared/types';
import { IconButton, Text, TextView } from '@/shared/ui';

import TestIcon from '../../../assets/icons/arrow-score-up.svg';
import CopyIcon from '../../../assets/icons/copy.svg';
import LinkIcon from '../../../assets/icons/maximize.svg';

import styles from './TransactionHistoryItem.module.scss';

type TransactionHistoryItemProps = {
  heading: string;
  date: string;
  value: string;
  fee: string;
  isDark?: boolean;
};

export const TransactionHistoryItem: ComponentWithProps<TransactionHistoryItemProps> = ({
  heading,
  date,
  value,
  fee,
  isDark = false,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <li className={clsx(styles.root, isOpened && styles.opened, isDark && styles.dark, className)}>
      <div className={styles.top}>
        <div className={styles.transactionIconContainer}>
          <TestIcon />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Text className={styles.heading} textView={TextView.P2}>
              {heading}
            </Text>
            <Text className={styles.date} textView={TextView.C4}>
              {date}
            </Text>
          </div>
          <div className={styles.right}>
            <Text className={styles.value} textView={TextView.P2}>
              {value}
            </Text>
            <Text className={styles.fee} textView={TextView.C4}>
              Fee: {fee}
            </Text>
          </div>
        </div>
        <IconButton
          className={styles.downButton}
          icon={<DownIcon />}
          onClick={() => setIsOpened(prev => !prev)}
        />
      </div>
      {isOpened && (
        <div className={styles.bottom}>
          <Text className={styles.sendingFrom} textView={TextView.C4}>
            Sending from
          </Text>
          <div className={styles.detailsContainer}>
            <div className={styles.addressContainer}>
              <Text className={styles.address} textView={TextView.P2}>
                TPgZACb...LtGVRsn
              </Text>
              <IconButton className={styles.copyButton} icon={<CopyIcon />} />
            </div>
            <Link className={styles.explorerLink} href={''}>
              Explorer
              <div className={styles.explorerIconContainer}>
                <LinkIcon />
              </div>
            </Link>
          </div>
        </div>
      )}
    </li>
  );
};
