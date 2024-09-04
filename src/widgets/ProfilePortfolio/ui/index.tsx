import dynamic from 'next/dynamic';
import { Skeleton } from '@nextui-org/react';

export const ProfilePortfolio = dynamic(() => import('./ProfilePortfolio'), {
  ssr: false,
  loading: () => <Skeleton classNames={{ base: 'w-full h-15 dark:bg-background-tableRow' }} />,
});
