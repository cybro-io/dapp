import { defineConfig } from 'orval';

export default defineConfig({
  dapp: {
    input: 'https://testnet-dapp-api.cybro.io/openapi.json',
    output: {
      target: './src/shared/types/__generated/api',
      client: 'react-query',
      baseUrl: 'https://testnet-dapp-api.cybro.io',
    },
  },
});
