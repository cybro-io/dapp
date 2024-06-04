import React from 'react';

import { useModal } from '@/app/providers';
import { HowTrustScoreCountsInfo } from '@/entities/HowTrustScoreCounts';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonView } from '@/shared/ui';
import { ModalLayout } from '@/shared/ui/modals/ModalLayout';

import styles from './HowTrustScoreCountsModal.module.scss';

type HowTrustScoreCountsModalProps = {};

export const HowTrustScoreCountsModal: ComponentWithProps<HowTrustScoreCountsModalProps> = ({
  className,
}) => {
  const { closeModal } = useModal();

  return (
    <ModalLayout title={'How Trust Score Counts'}>
      <HowTrustScoreCountsInfo className={styles.modal} />
      <Button onClick={closeModal} className={styles.button} view={ButtonView.Secondary}>
        Okay, got it
      </Button>
    </ModalLayout>
  );
};
