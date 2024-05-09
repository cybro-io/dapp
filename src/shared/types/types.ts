import React from 'react';

export type ComponentWithProps<T> = React.FC<
  T & {
    className?: string;
  }
>;
