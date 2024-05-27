import React from 'react';

import VaultPage from '@/pages/VaultPage';
import { BaseLayout } from '@/shared/ui';

type pageProps = {};

export default function Vault() {
  return (
    <BaseLayout>
      <VaultPage />
    </BaseLayout>
  );
}
