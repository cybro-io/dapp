import { theme } from '../../../../tailwind.config';
import { useMediaQuery as useMediaQueryUHT } from 'usehooks-ts';

const mediaQueries = {
  sm: `(max-width: ${theme.screens.sm})`,
  md: `(max-width: ${theme.screens.md})`,
  lg: `(max-width: ${theme.screens.lg})`,
  '2lg': `(max-width: ${theme.screens['2lg']})`,
  xl: `(max-width: ${theme.screens.xl})`,
  '2xl': `(max-width: ${theme.screens['2xl']})`,
};

export const useMediaQuery = (
  query: keyof typeof mediaQueries,
  options?: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
  },
) => {
  return useMediaQueryUHT(mediaQueries[query], options);
};
