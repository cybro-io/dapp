'use client';

import React, { useEffect, useState } from 'react';

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

  // todo: fixme
  const [refcode, setRefcode] = useState('');
  useEffect(() => {
    if (address) {
      fetch(`https://dapp-api.cybro.io/api/v1/profile/${address}/refcode`)
        .then(response => response.json())
        .then(data => {
          if (data.ok && data.data) {
            setRefcode(data.data);
          }
        });
    }
  }, [address]);

  const fullLink = React.useMemo(() => `${presaleUrl}/?ref=${refcode}`, [address, presaleUrl, refcode]);
  const shortLink = React.useMemo(
    () => `${shortenUrl}/?ref=${refcode}`,
    [address, shortenUrl, refcode],
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
    <React.Fragment>
      {!!refcode && <div className={clsx(styles.root, className)}>
        <Text className={styles.link} textView={TextView.P2}>
          {shortLink}
        </Text>
        <IconButton className={styles.button} icon={<CopyIcon />} onClick={onCopyClick} />
      </div>}
    </React.Fragment>
  )
    ;
};
