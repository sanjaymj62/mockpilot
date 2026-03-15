FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY packages/core/dist ./packages/core/dist
COPY apps/backend/dist ./apps/backend/dist
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/node_modules ./apps/backend/node_modules

USER nodejs

WORKDIR /app/apps/backend

EXPOSE 3001

CMD ["node", "dist/index.js"]
