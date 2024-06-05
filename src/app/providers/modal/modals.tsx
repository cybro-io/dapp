import React from 'react';

import { HowTrustScoreCountsModal } from '@/entities/HowTrustScoreCounts';
import { YieldSwitchOptions } from '@/shared/const';
import { YieldCalculatorModal } from '@/widgets/YieldCalculator';

export enum Modal {
  HowTrustScoreCounts,
  YieldCalculator,
}

export const ModalIdToView: Record<Modal, React.ReactElement> = {
  [Modal.HowTrustScoreCounts]: <HowTrustScoreCountsModal />,
  [Modal.YieldCalculator]: <YieldCalculatorModal />,
};
