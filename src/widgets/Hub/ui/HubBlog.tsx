import React from 'react';

import clsx from 'clsx';

import { useMediaQuery } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';
import { ArticleCard } from '@/entities/Hub';

import blogStyles from './Blog.module.scss';

export const HubBlog = () => {
  const isMediumScreen = useMediaQuery('md');

  return (
    <section
      id="blog"
      className="mt-[42px] md:mt-[70px] px-6 md:px-0 flex flex-row justify-between gap-x-[73px] gap-y-6 flex-wrap"
    >
      <div
        className={clsx(
          blogStyles.blog,
          'flex-1 relative flex flex-col gap-9 px-[35px] pt-[43px] pb-[35px] max-w-[588px] w-full min-h-[455px] bg-black',
        )}
      >
        <div className="flex flex-col gap-2 text-center">
          <Text textView={isMediumScreen ? TextView.H3 : TextView.H2}>
            Latest Crypto News & Insights
          </Text>
          <Text textView={TextView.BP2} className="mt-2 !text-white/80">
            Stay updated with the most important trends and developments in the world of
            cryptocurrency. From market movements to regulatory changes.
          </Text>
          <Text textView={TextView.BU2}>
            Explore expert analysis and predictions to make informed investment decisions.
          </Text>
        </div>

        <div className="flex flex-col gap-[15px] text-center">
          <form className="flex flex-col lg:flex-row gap-y-4 items-centerm rounded-[18px] bg-transparent lg:bg-background-chips p-0 lg:pr-1 lg:pl-[27px] lg:py-1">
            <input
              className="flex-1 bg-background-chips lg:bg-transparent outline-none py-[23px] pl-[23px] rounded-[18px] lg:p-0"
              placeholder="Your email here"
              type="email"
            />
            <Button
              className="flex-1 w-full lg:max-w-[173px]"
              size={ButtonSize.Large}
              type="submit"
            >
              Send
            </Button>
          </form>
          <Text textView={TextView.C4}>
            {'No spam. '}
            <span className="text-white/80">Only updates and release announcements.</span>
          </Text>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 justify-between">
        <div className="flex flex-col gap-3">
          <ArticleCard href="/" title="Test" description="Desc" />
          <ArticleCard href="/" title="Test" description="Desc" />
          <ArticleCard href="/" title="Test" description="Desc" />
        </div>
        <Button view={ButtonView.Secondary} className="w-full md:w-fit">
          Read more articles
        </Button>
      </div>
    </section>
  );
};
