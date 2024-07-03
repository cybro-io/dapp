import React from 'react';

import { HowTrustScoreCountsModal } from '@/entities/HowTrustScoreCounts';
import { SupportRequestModal } from '@/widgets/SupportRequest';
import { YieldCalculatorModal } from '@/widgets/YieldCalculator';

export enum Modal {
  HowTrustScoreCounts,
  YieldCalculator,
  SupportRequest,
}

export const ModalIdToView: Record<Modal, React.ReactElement> = {
  [Modal.HowTrustScoreCounts]: <HowTrustScoreCountsModal />,
  [Modal.YieldCalculator]: <YieldCalculatorModal />,
  [Modal.SupportRequest]: <SupportRequestModal />,
};
