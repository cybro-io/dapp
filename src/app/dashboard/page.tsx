import React from 'react';

import DashboardPage from '@/pages/DashboardPage';
import { BaseLayout } from '@/shared/ui';

type pageProps = {};

export default function Dashboard() {
  return (
    <BaseLayout>
      <DashboardPage />
    </BaseLayout>
  );
}
