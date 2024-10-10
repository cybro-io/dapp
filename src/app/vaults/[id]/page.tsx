import React from 'react';

import { QueryClient } from '@tanstack/react-query';

import { BaseLayout } from '@/app/layouts';
import { PageViewAnalytics } from '@/shared/analytics/page-view-analytics';
import { QueryKey } from '@/shared/const';
import {
  getFundApiV1VaultsVaultIdGet,
  getFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import { VaultPage } from '@/views/VaultPage';

export default async function Vault({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const vaultId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.Vault, vaultId],
    queryFn: () => getFundApiV1VaultsVaultIdGet(vaultId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.TrustScoreDetails, vaultId],
    queryFn: () =>
      getFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(vaultId),
  });

  return (
    <BaseLayout>
      <PageViewAnalytics pageType="vault" pageId={vaultId} />
      <VaultPage vaultId={vaultId} />
    </BaseLayout>
  );
}
