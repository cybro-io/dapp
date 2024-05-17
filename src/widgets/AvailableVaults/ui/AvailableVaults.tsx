import React from 'react';

import clsx from 'clsx';

import { JoinCommunityBanner } from '@/entities/JoinCommunityBanner';
import { Tvl } from '@/entities/Tvl';
import { Vault } from '@/entities/Vault';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

export const AvailableVaults: ComponentWithProps<AvailableVaultsProps> = ({ className }) => {
  const vaults = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H2}>
          Available Vaults
        </Text>
        <Tvl className={styles.chip}>Cybro TVL $950,000</Tvl>
      </div>

      <div className={styles.vaults}>
        {vaults.map((vault, index) => {
          if (index === 2) {
            return (
              <React.Fragment>
                <JoinCommunityBanner className={styles.joinBanner} />
                <Vault />
              </React.Fragment>
            );
          }
          return <Vault />;
        })}
      </div>
    </section>
  );
};
