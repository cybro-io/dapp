'use client';

import { useLocalStorage } from 'usehooks-ts';

import { Mixpanel, MixpanelEvent } from '@/shared/analytics';
import { useMediaQuery } from '@/shared/lib';

import { AvailableVaultsViewType } from './types';

const AVAILABLE_VAULTS_VIEW_KEY = 'availableVaultsView';

export const useAvailableVaultsView = () => {
  const [viewType, setAvailableVaultsView] = useLocalStorage<AvailableVaultsViewType>(
    AVAILABLE_VAULTS_VIEW_KEY,
    AvailableVaultsViewType.Table,
  );

  const setViewType = (viewType: AvailableVaultsViewType) => {
    setAvailableVaultsView(viewType);
    Mixpanel.track(MixpanelEvent.ChangeVaultListStyle, { viewType });
  };

  return { viewType, setViewType };
};
