import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { PageViewAnalytics } from '@/shared/analytics/page-view-analytics';
import { OneClickPage } from '@/views/OneClickPage';

export default function OneClick() {
  return (
    <BaseLayout>
      <PageViewAnalytics pageType="oneClick" />
      <OneClickPage />
    </BaseLayout>
  );
}
