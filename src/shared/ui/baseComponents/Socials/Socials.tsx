'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import DiscordIcon from '@/shared/assets/socials/discord.svg';
import TelegramIcon from '@/shared/assets/socials/telegram.svg';
import TwitterIcon from '@/shared/assets/socials/twitter.svg';
import { ComponentWithProps } from '@/shared/types';

import styles from './Socials.module.scss';

type SocialsProps = {};

export const Socials: ComponentWithProps<SocialsProps> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Link className={styles.social} href={'/'}>
        <TwitterIcon />
      </Link>
      <Link className={styles.social} href={'/'}>
        <DiscordIcon />
      </Link>
      <Link className={styles.social} href={'/'}>
        <TelegramIcon />
      </Link>
    </div>
  );
};
