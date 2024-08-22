'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import './toggle.scss';
import { ProfileStatsPanel } from '@/entities/Profile';
import LogoIcon from '@/shared/assets/icons/logo-mini.svg';
import ProfileImage from '@/shared/assets/icons/profile.png';
import { truncateMiddle } from '@/shared/lib';
import { formatMoney } from '@/shared/utils';

import { useUserToggle } from '../model/useUserToggle';

type ProfileStatsPopoverProps = {
  className?: string;
};

export const ProfileStatsPopover = ({ className }: ProfileStatsPopoverProps) => {
  const [isOpened, setOpen] = React.useState(false);

  const { address, userProfile, earnedYield } = useUserToggle();

  return (
    <div className={clsx('user-toggle__wrapper', className)}>
      <button
        className={`user-toggle ${isOpened ? 'active' : ''}`}
        onClick={() => setOpen(prevState => !prevState)}
      >
        <div className={'user-toggle__profile'}>
          <Image src={ProfileImage} alt="profile" className={'user-toggle__profile-icon'} />
        </div>
        <div className={'user-toggle__content'}>
          <div className="user-toggle__inner">
            <span className="user-toggle__name">{truncateMiddle(address, 3)}</span>
          </div>
          <div className="user-toggle__inner landscape">
            <span className="user-toggle__money">
              {userProfile ? formatMoney(userProfile.balance) : ''}
            </span>
            <LogoIcon className="user-toggle__currency" />
          </div>
        </div>
      </button>
      {isOpened && userProfile && earnedYield && (
        <div className="user-toggle__menu">
          <ProfileStatsPanel
            address={address}
            profileData={userProfile}
            earnedYield={earnedYield}
          />
        </div>
      )}
    </div>
  );
};
