'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import ArrowIcon from '@/shared/assets/icons/arrow-left-bold.svg';
import DiscordIcon from '@/shared/assets/socials/discord.svg';
import TelegramIcon from '@/shared/assets/socials/telegram.svg';
import TwitterIcon from '@/shared/assets/socials/twitter.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, Logo } from '@/shared/ui';

import styles from './Footer.module.scss';

type FooterProps = {};

export const Footer: ComponentWithProps<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx(styles.root, className)}>
      <div className={styles.footerContainer}>
        <div className={clsx(styles.section)}>
          <div className={styles.logoContainer}>
            <Logo height={17} width={138} />
          </div>
          <p className={styles.slogan}>dApp, offering you multiple earning paths on Blast</p>
          <Button className={styles.buyButton} endIcon={<ArrowIcon />}>
            Buy cybro tokens
          </Button>
        </div>
        <div className={clsx(styles.section)}>
          <p className={styles.sectionHeading}>Follow us</p>
          <ul className={clsx(styles.sectionList)}>
            <li className={clsx(styles.socialItem, styles.sectionItem)}>
              <Link className={styles.socialLink} href="https://google.com" target="_blank">
                <TwitterIcon />
                <span>Twitter</span>
              </Link>
            </li>
            <li className={clsx(styles.socialItem, styles.sectionItem)}>
              <Link className={styles.socialLink} href="https://google.com" target="_blank">
                <DiscordIcon />
                <span>Discord</span>
              </Link>
            </li>
            <li className={clsx(styles.socialItem, styles.sectionItem)}>
              <Link className={styles.socialLink} href="https://google.com" target="_blank">
                <TelegramIcon />
                <span>Telegram</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={clsx(styles.section)}>
          <p className={styles.sectionHeading}>Legal</p>
          <ul className={clsx(styles.sectionList)}>
            <li className={styles.sectionItem}>
              <Link href={'/'}>Terms and Conditions</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link href={'/'}>Privacy Policy</Link>
            </li>
            <li className={styles.sectionItem}>
              <Link href={'/'}>Documentation</Link>
            </li>
          </ul>
        </div>
        <div className={clsx(styles.section)}>
          <p className={styles.sectionHeading}>Company</p>
          <ul className={clsx(styles.sectionList)}>
            <li className={styles.sectionItem}>
              <Link href={'/'}>Support</Link>
            </li>
          </ul>
          <p className={clsx(styles.copyright, styles.copyrightLong)}>
            CoinLock Protector LLC, Saint Vincent and the Grenadines
          </p>
        </div>
      </div>
      <p className={styles.copyright}>CoinLock Protector LLC</p>
    </footer>
  );
};
