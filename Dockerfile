FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID
ARG NEXT_PUBLIC_ANKR_ID
ARG NEXT_PUBLIC_MIXPANEL_ID
ARG NEXT_PUBLIC_TYPE
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_PRESALE_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID=${NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID}
ENV NEXT_PUBLIC_ANKR_ID=${NEXT_PUBLIC_ANKR_ID}
ENV NEXT_PUBLIC_MIXPANEL_ID=${NEXT_PUBLIC_MIXPANEL_ID}
ENV NEXT_PUBLIC_TYPE=${NEXT_PUBLIC_TYPE}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_PRESALE_URL=${NEXT_PUBLIC_PRESALE_URL}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/shared/types/__generated ./src/shared/types/__generated

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID
ARG NEXT_PUBLIC_ANKR_ID
ARG NEXT_PUBLIC_MIXPANEL_ID
ARG NEXT_PUBLIC_TYPE
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_PRESALE_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID=${NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID}
ENV NEXT_PUBLIC_ANKR_ID=${NEXT_PUBLIC_ANKR_ID}
ENV NEXT_PUBLIC_MIXPANEL_ID=${NEXT_PUBLIC_MIXPANEL_ID}
ENV NEXT_PUBLIC_TYPE=${NEXT_PUBLIC_TYPE}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_PRESALE_URL=${NEXT_PUBLIC_PRESALE_URL}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

RUN \
  if [ -f yarn.lock ]; then yarn run test; \
  elif [ -f package-lock.json ]; then npm run test; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run test; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/src/shared/types/__generated ./src/shared/types/__generated


USER nextjs

EXPOSE 3000

ENV PORT 3000

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID
ARG NEXT_PUBLIC_ANKR_ID
ARG NEXT_PUBLIC_MIXPANEL_ID
ARG NEXT_PUBLIC_TYPE
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_PRESALE_URL
ARG NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID=${NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID}
ENV NEXT_PUBLIC_ANKR_ID=${NEXT_PUBLIC_ANKR_ID}
ENV NEXT_PUBLIC_MIXPANEL_ID=${NEXT_PUBLIC_MIXPANEL_ID}
ENV NEXT_PUBLIC_TYPE=${NEXT_PUBLIC_TYPE}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_PRESALE_URL=${NEXT_PUBLIC_PRESALE_URL}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
