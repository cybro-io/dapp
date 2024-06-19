'use client';

import mixpanel, { Dict } from 'mixpanel-browser';

import { MixpanelEvent } from '@/shared/analytics/events';
import { Maybe } from '@/shared/types';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

if (!MIXPANEL_ID) {
  throw new Error('Mixpannel ID was not found');
}

mixpanel.init(MIXPANEL_ID, { debug: true, ignore_dnt: true });

export const Mixpanel = {
  track: (name: MixpanelEvent, props?: Maybe<Dict>) => {
    mixpanel.track(name, props);
  },
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
};
