FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY package.json pnpm-lock.yaml ./
COPY packages/core ./packages/core
COPY apps/backend ./apps/backend

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prod

USER nodejs

WORKDIR /app/apps/backend

EXPOSE 3001

CMD ["node", "dist/index.js"]
