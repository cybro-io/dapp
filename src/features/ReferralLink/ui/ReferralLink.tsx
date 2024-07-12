'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';

import { useToast } from '@/shared/hooks';
import { ComponentWithProps } from '@/shared/types';
import { IconButton, Text, TextView, ToastType } from '@/shared/ui';
import { shortenWalletAddress } from '@/shared/utils';

import CopyIcon from '../assets/icon/copy.svg';

import styles from './ReferralLink.module.scss';

type ReferralLinkProps = {};

export const ReferralLink: ComponentWithProps<ReferralLinkProps> = ({ className }) => {
  const { address } = useWeb3ModalAccount();
  const { triggerToast } = useToast();

  const presaleUrl = process.env.NEXT_PUBLIC_PRESALE_URL;
  const shortenUrl = presaleUrl?.replace(/^https?:\/\//, '');

  const fullLink = React.useMemo(() => `${presaleUrl}/?ref=${address}`, [address, presaleUrl]);
  const shortLink = React.useMemo(
    () => `${shortenUrl}/?ref=${shortenWalletAddress(address, 3)}`,
    [address, shortenUrl],
  );

  const onCopyClick = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
      triggerToast({
        message: 'Success',
        description: 'Link was successfully copied',
      });
    } catch (e) {
      triggerToast({
        message: 'Error',
        description: 'Error copying link',
        type: ToastType.Error,
      });
    }
  }, [fullLink, triggerToast]);

  return (
    <div className={clsx(styles.root, className)}>
      <Text className={styles.link} textView={TextView.P2}>
        {shortLink}
      </Text>
      <IconButton className={styles.button} icon={<CopyIcon />} onClick={onCopyClick} />
    </div>
  );
};
