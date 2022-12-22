# 1. Install dependencies only when needed
FROM node:lts-buster-slim AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
RUN apt-get update && apt-get install libssl-dev ca-certificates -y

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM deps AS builder
RUN export NODE_ENV=production
WORKDIR /app
RUN yarn
COPY . .
RUN yarn build


# 3. Production image, copy all the files and run next
FROM deps as prod-build
RUN yarn install --production
RUN cp -R node_modules prod_node_modules
FROM deps as prod

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=builder  /app/.next /app/.next
COPY --from=builder  /app/public /app/public
USER nextjs

EXPOSE 3000

ENV PORT 3000
CMD ["yarn", "start"]