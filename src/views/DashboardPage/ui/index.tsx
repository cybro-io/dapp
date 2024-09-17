import dynamic from 'next/dynamic';
import { Skeleton } from '@nextui-org/react';

export const DashboardPage = dynamic(() => import('./DashboardPage'), {
  ssr: false,
  loading: () => (
    <Skeleton
      disableAnimation
      classNames={{ base: 'rounded-lg w-full mt-6 h-[560px] dark:bg-background-tableRow' }}
    />
  ),
});
