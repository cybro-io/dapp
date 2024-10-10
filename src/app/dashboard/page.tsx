import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { PageViewAnalytics } from '@/shared/analytics/page-view-analytics';
import { DashboardPage } from '@/views/DashboardPage';

export default async function Dashboard() {
  return (
    <BaseLayout>
      <PageViewAnalytics pageType="dashboard" />
      <DashboardPage />
    </BaseLayout>
  );
}
