FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV CI=true

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY . .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile && \
    pnpm build:core && \
    pnpm build:backend

WORKDIR /app/apps/backend

USER nodejs

EXPOSE 3001

ENTRYPOINT ["node", "dist/index.js"]
