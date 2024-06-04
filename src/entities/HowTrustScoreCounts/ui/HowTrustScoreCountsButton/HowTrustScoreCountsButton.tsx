'use client';

import React from 'react';

import clsx from 'clsx';

import { Modal, useModal } from '@/app/providers';
import {
  HowTrustScoreCountsButtonViewType,
  HowTrustScoreCountsInfo,
  HowTrustScoreCountsInfoViewType,
} from '@/entities/HowTrustScoreCounts';
import InfoIcon from '@/shared/assets/icons/info.svg';
import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView } from '@/shared/ui';

import styles from './HowTrustScoreCountsButton.module.scss';

type HowTrustScoreCountsProps = {
  viewType?: HowTrustScoreCountsButtonViewType;
  hasIcon?: boolean;
};

export const HowTrustScoreCountsButton: ComponentWithProps<HowTrustScoreCountsProps> = ({
  viewType = LinkView.Button,
  hasIcon = true,
  className,
}) => {
  const { openModal } = useModal();

  return (
    <Link
      onClick={() => openModal(Modal.HowTrustScoreCounts)}
      viewType={viewType as LinkView}
      className={clsx(styles.root, className)}
      tooltipClassName={styles.tooltip}
      tooltipContent={
        <HowTrustScoreCountsInfo viewType={HowTrustScoreCountsInfoViewType.Tooltip} />
      }
    >
      How trust score counts
      {viewType === HowTrustScoreCountsButtonViewType.Button && hasIcon && (
        <div>
          <InfoIcon />
        </div>
      )}
    </Link>
  );
};
