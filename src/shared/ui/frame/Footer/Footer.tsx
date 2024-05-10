import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './Footer.module.scss';

type FooterProps = {};

export const Footer: ComponentWithProps<FooterProps> = ({ className }) => {
  return <footer className={clsx(styles.root, className)}></footer>;
};
