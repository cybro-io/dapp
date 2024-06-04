import React from 'react';

import { HowTrustScoreCountsModal } from '@/entities/HowTrustScoreCounts';

export enum Modal {
  HowTrustScoreCounts,
}

export const ModalIdToView: Record<Modal, React.ReactElement> = {
  [Modal.HowTrustScoreCounts]: <HowTrustScoreCountsModal />,
};
