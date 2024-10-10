'use client';

import { useEffect } from 'react';

import { track } from './analytics';
import { AnalyticsEvent } from './events';

export const PageViewAnalytics = ({
  pageType,
  pageId,
}: {
  pageType: string;
  pageId?: string | number;
}) => {
  useEffect(() => {
    track.event(AnalyticsEvent.PageLoad, { pageType, pageId });
  }, [pageType, pageId]);

  return null;
};
