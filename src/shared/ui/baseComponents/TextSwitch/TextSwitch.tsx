import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './TextSwitch.module.scss';

type TextSwitchProps = {
  options: string[];
  onChange?: (activeOption: string) => void;
};

export const TextSwitch: ComponentWithProps<TextSwitchProps> = ({
  options,
  onChange,
  className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleToggle = (index: number) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(options[index]);
    }
  };

  return (
    <div
      className={clsx(styles.toggleContainer, className)}
      style={{ '--num-options': options.length } as React.CSSProperties}
    >
      <div
        style={{ transform: `translateX(${(activeIndex * 100) / (options.length - 1)}%)` }}
        className={styles.slider}
      />
      {options.map((option, index) => {
        return (
          <div
            onClick={() => handleToggle(index)}
            className={clsx(styles.button, activeIndex === index ? styles.active : styles.inactive)}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};
