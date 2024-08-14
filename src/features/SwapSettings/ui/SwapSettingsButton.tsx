import React from 'react';

import { SwapSettings } from '@/features/SwapSettings';
import SettingsIcon from '@/shared/assets/icons/settings-03.svg';
import { IconButton } from '@/shared/ui';

import { useSwapSettingsModal } from '../model/useSwapSettingsModal';

type SwapSettingsButtonProps = {
  onChangeSettings: (data: SwapSettings) => void;
};

export const SwapSettingsButton = ({ onChangeSettings }: SwapSettingsButtonProps) => {
  const { openModal } = useSwapSettingsModal();

  return (
    <IconButton
      type="button"
      className="border-solid border-1 border-stroke-tableBorder p-2.5 rounded-[10px] self-center"
      icon={<SettingsIcon className="text-white" />}
      onClick={() =>
        openModal({ defaultSlippage: 1, defaultDeadline: 60 }).then(data =>
          onChangeSettings(data as SwapSettings),
        )
      }
    />
  );
};
