'use client';

import React from 'react';

import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { InfoBox, InfoBoxActionType, InfoBoxViewType } from '@/shared/ui';

import ApyIcon from '../assets/icons/apy.svg';
import { ApyPeriod, ApyPeriodType, dropdownData } from '../const';

import styles from './ApyInfo.module.scss';

type ApyInfoProps = {
  viewType?: InfoBoxViewType;
};

export const ApyInfo: ComponentWithProps<ApyInfoProps> = ({
  viewType = InfoBoxViewType.Mobile,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [period, setPeriod] = React.useState<ApyPeriod>(ApyPeriod.Today);
  const [periodType, setPeriodType] = React.useState<ApyPeriodType>(ApyPeriodType.Fiat);

  const getTitle = React.useCallback(() => {
    if (period !== ApyPeriod.Today && period !== ApyPeriod.All) {
      return `Last ${period}`;
    }

    return period;
  }, [period]);

  const onItemClick = React.useCallback((period: ApyPeriod) => {
    setPeriod(period);
    setIsOpened(false);
  }, []);

  const onPeriodTypeChange = React.useCallback((isSelected: boolean) => {
    isSelected ? setPeriodType(ApyPeriodType.Fiat) : setPeriodType(ApyPeriodType.Percent);
  }, []);

  const getValue = React.useCallback(() => {
    if (viewType === InfoBoxViewType.Desktop) {
      return '14% - $1’100K';
    }

    if (periodType === ApyPeriodType.Fiat) {
      return '$1’100K';
    }

    return '14%';
  }, [periodType, viewType]);

  const dropdownItems = React.useMemo(
    () =>
      dropdownData.map(({ title, key }) => (
        <button
          className={clsx(styles.dropdownItem, period === key && styles.active)}
          key={key}
          onClick={() => onItemClick(key)}
        >
          {title}
        </button>
      )),
    [period, onItemClick],
  );

  return (
    <InfoBox
      icon={<ApyIcon />}
      title={'APY'}
      value={getValue()}
      isOpened={isOpened}
      setIsOpened={() => setIsOpened(prev => !prev)}
      viewType={viewType}
      actionType={InfoBoxActionType.Select}
      className={className}
      dropdownButtonContent={getTitle()}
      dropdownItems={dropdownItems}
      rightContent={
        <Switch
          onValueChange={onPeriodTypeChange}
          classNames={{
            wrapper: clsx(styles.wrapper),
            thumb: clsx(styles.thumb),
          }}
          defaultSelected
          startContent={<span className={styles.switchContent}>%</span>}
          endContent={<span className={styles.switchContent}>$</span>}
          thumbIcon={({ isSelected }) =>
            !isSelected ? (
              <span className={clsx(styles.switchContent, styles.selected)}>%</span>
            ) : (
              <span className={clsx(styles.switchContent, styles.selected)}>$</span>
            )
          }
        />
      }
    />
  );
};
