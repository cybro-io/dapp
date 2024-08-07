import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    config.module.rules.push({
      test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'],
    });

    return config;
  },
  sassOptions: {
    prependData: `@import "${path.resolve(__dirname, 'src/shared/styles/variables.scss')}";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linkee.ws',
      },
    ],
  },
};

export default nextConfig;
