'use client';

import React from 'react';

import clsx from 'clsx';

import { ApyInfo } from '@/entities/ApyInfo';
import { ComponentWithProps } from '@/shared/types';
import { InfoBox, InfoBoxViewType } from '@/shared/ui';

import { MyVaultsInfo } from '../../../entities/MyVaultsInfo';
import DepositIcon from '../assets/icons/deposit.svg';
import YieldIcon from '../assets/icons/yield.svg';

import styles from './DashboardInfo.module.scss';

type DashboardInfoProps = {};

export const DashboardInfo: ComponentWithProps<DashboardInfoProps> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.mobile}>
        <InfoBox icon={<DepositIcon />} title={'Your deposit'} value={'$1’100K'} />
        <InfoBox icon={<YieldIcon />} title={'Accrued yield'} value={'$1’100K'} />
        <MyVaultsInfo />
        <ApyInfo />
      </div>

      <div className={styles.desktop}>
        <InfoBox
          icon={<DepositIcon />}
          title={'Your deposit'}
          value={'$1’100K'}
          viewType={InfoBoxViewType.Desktop}
        />
        <InfoBox
          icon={<YieldIcon />}
          title={'Accrued yield'}
          value={'$1’100K'}
          viewType={InfoBoxViewType.Desktop}
        />
        <MyVaultsInfo viewType={InfoBoxViewType.Desktop} />
        <ApyInfo viewType={InfoBoxViewType.Desktop} />
      </div>
    </div>
  );
};
