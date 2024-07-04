import dotenv from 'dotenv';
import { defineConfig } from 'orval';

dotenv.config({ path: '.env.local' });

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default defineConfig({
  dapp: {
    input: `https://testnet-dapp-api.cybro.io/openapi.json`,
    output: {
      target: './src/shared/types/__generated/api',
      client: 'react-query',
      baseUrl,
    },
  },
});
