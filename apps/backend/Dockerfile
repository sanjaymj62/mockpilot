FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY packages/core/package.json ./packages/core/package.json
COPY packages/core/dist ./packages/core/dist
COPY apps/backend/package.json ./apps/backend/package.json

WORKDIR /app/apps/backend

RUN npm ci --omit=dev

USER nodejs

COPY --chown=nodejs:nodejs apps/backend/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
