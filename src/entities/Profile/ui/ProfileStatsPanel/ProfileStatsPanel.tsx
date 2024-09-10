'use client';

import React, { useMemo } from 'react';

import { Skeleton } from '@nextui-org/react';
import { useDisconnect } from '@web3modal/ethers5/react';
import Image from 'next/image';

import './menu.scss';

import CopyIcon from '@/shared/assets/icons/copy.svg';
import EthIcon from '@/shared/assets/icons/eth.svg';
import LogoIcon from '@/shared/assets/icons/logo-mini.svg';
import ProfileImage from '@/shared/assets/icons/profile.png';
import TetherIcon from '@/shared/assets/icons/tether.svg';
import UsdbIcon from '@/shared/assets/icons/usdb.svg';
import { links, truncateMiddle } from '@/shared/lib';
import { EarnedYieldResponseDataProperty, GetWalletResponseData } from '@/shared/types';
import { formatMoney } from '@/shared/utils';

type ProfileStatsPanelProps = {
  profileData?: GetWalletResponseData;
  earnedYield?: EarnedYieldResponseDataProperty;
  address: string;
  isLoading?: boolean;
};

export const ProfileStatsPanel = ({
  profileData,
  earnedYield,
  address,
  isLoading,
}: ProfileStatsPanelProps) => {
  const { disconnect } = useDisconnect();

  const data = useMemo(
    () => ({
      list: [
        {
          label: 'CYBRO Balance',
          value: formatMoney(profileData?.balance ?? 0),
          leftIcon: LogoIcon,
          isNativeYieldInfo: false,
        },
        {
          label: 'CYBRO Points',
          value: `${profileData?.points ?? 0} pts`,
          isNativeYieldInfo: false,
        },
        {
          label: 'Referral rewards',
          leftIcon: TetherIcon,
          value: `${formatMoney(Number(profileData?.affiliate_balance ?? 0))}`,
        },
        {
          label: 'Total Earned',
          leftIcon: EthIcon,
          value: `${formatMoney(Number(earnedYield?.ETH?.total))}`,
          isNativeYieldInfo: true,
        },
        {
          label: 'Due Last Week',
          leftIcon: EthIcon,
          value: `${formatMoney(Number(earnedYield?.ETH?.last))}`,
          isNativeYieldInfo: true,
        },
        {
          label: null,
          leftIcon: UsdbIcon,
          value: `${formatMoney(Number(earnedYield?.USDB?.total))}`,
          isNativeYieldInfo: true,
        },
        {
          label: null,
          leftIcon: UsdbIcon,
          value: `${formatMoney(Number(earnedYield?.USDB?.last))}`,
          isNativeYieldInfo: true,
        },
      ],
      desc: 'You are a participant in the Pre-Alpha Yield Program and earn <b>additional income</b> from your Cybro Token Balance.',
    }),
    [profileData, earnedYield],
  );

  const regexp = /<b>(.*)<\/b>/;
  const separatedDesc = data.desc.split(regexp);

  const formattedDescription = {
    firstPart: separatedDesc[0],
    boldText: data?.desc?.match(regexp)?.[1] || '',
    secondPart: separatedDesc[1],
  };

  const userBalance = useMemo(() => {
    if (profileData?.balance_usd && Number(profileData.balance_usd)) {
      return Number(profileData.balance_usd);
    }

    return 0;
  }, [profileData?.balance_usd]);

  return (
    <div className="user-menu z-50 relative">
      <div className="user-menu__header">
        <div className="user-menu__header-block">
          <span className="user-menu__header-label">Your Cybro Profile</span>
          <button onClick={disconnect} className="user-menu__logout">
            Log out
          </button>
        </div>
        <div className="user-menu__copy">
          <Image src={ProfileImage} alt="profile" className={'user-menu__logo'} />
          <span className="user-menu__copy-text">{truncateMiddle(address, 3)}</span>
          <div className="user-menu__copy-box">
            <button
              className="user-menu__copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(`${address}`);
              }}
            >
              <CopyIcon className="user-menu__copy-icon" />
            </button>
            <span className="user-menu__copy-label">Copied!</span>
          </div>
        </div>
      </div>
      <div className="user-menu__content">
        <ul className="user-menu__list">
          {data.list.map(
            (item, index) =>
              (!item.isNativeYieldInfo ||
                (item.isNativeYieldInfo && profileData?.claimable_yield_enrolled)) && (
                <div
                  key={'userMenuItem' + index}
                  className={`user-menu__item${item.label === null ? ' user-menu__item-compact' : ''}`}
                >
                  {item.label !== null && (
                    <span className="user-menu__item-label">{item.label}</span>
                  )}
                  <div className="user-menu__item-content">
                    {item.leftIcon ? (
                      <item.leftIcon className="user-menu__item-currency-left" />
                    ) : null}
                    <span className="user-menu__item-value">
                      {isLoading ? (
                        <Skeleton
                          classNames={{
                            base: 'w-12 h-[22px] rounded-lg dark:bg-background-tableRow',
                          }}
                        />
                      ) : (
                        item.value
                      )}
                    </span>
                    {/*{item.additionValue ? (*/}
                    {/*  <span className="user-menu__item-addition">{item.additionValue}</span>*/}
                    {/*) : null}*/}
                  </div>
                </div>
              ),
          )}
        </ul>
        {!!userBalance && profileData?.claimable_yield_enrolled && (
          <p className="user-menu__desc">
            <span>{formattedDescription.firstPart}</span>
            {formattedDescription.boldText ? <b>{formattedDescription.boldText}</b> : null}
            {formattedDescription.secondPart ? (
              <span>&nbsp;{formattedDescription.secondPart}</span>
            ) : null}
          </p>
        )}
        {!profileData?.claimable_yield_enrolled && (
          <div className="user-menu__offer">
            <span className="user-menu__offer-title">Boost your Yield Now</span>
            <p className="user-menu__offer-desc">
              Deposit in total $1000 or more and unlock a higher yield!
            </p>
            <a
              href={`${links.preSale}/#form`}
              target="_blank"
              className={'button button--yellow button--arrow user-menu__offer-btn'}
              rel="noreferrer"
            >
              Top up cybro balance
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
