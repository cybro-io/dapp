import dynamic from 'next/dynamic';
import { Skeleton } from '@nextui-org/react';

export const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
  loading: () => (
    <Skeleton classNames={{ base: 'w-[176px] h-9 rounded-lg dark:bg-background-tableRow' }} />
  ),
});
