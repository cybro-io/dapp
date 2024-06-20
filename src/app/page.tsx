import React from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { BaseLayout } from '@/app/layouts';
import { getVaultsApiV1VaultsGet } from '@/shared/types/__generated/api/fastAPI';
import { HomePage } from '@/views/HomePage';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['vaults'],
    queryFn: getVaultsApiV1VaultsGet,
  });

  return (
    <BaseLayout>
      {/*<HydrationBoundary state={dehydrate(queryClient)}>*/}
      <HomePage />
      {/*</HydrationBoundary>*/}
    </BaseLayout>
  );
}
