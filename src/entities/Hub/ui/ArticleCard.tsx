import React from 'react';

import { Text, TextView } from '@/shared/ui';

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
};

export const ArticleCard = ({ title, description, href }: ArticleCardProps) => {
  return (
    <a
      href={href}
      className="*:cursor-pointer min-w-0 md:min-w-[375px] flex flex-col gap-3 w-full p-2.5 hover:bg-background-chips rounded-[10px]"
    >
      <Text textView={TextView.BU1}>{title}</Text>
      <Text textView={TextView.C4} className="!text-white/60">
        {description}
        Bitcoin's price has once again hit record highs, surpassing the $50,000 mark. Experts weigh
        in on what this means for future market movements and investment strategies.
      </Text>
    </a>
  );
};
