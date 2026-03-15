FROM node:20-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

COPY packages/core/dist ./packages/core/dist
COPY apps/web/public ./apps/web/public
COPY apps/web/.next/standalone ./apps/web/.next/standalone
COPY apps/web/.next/static ./apps/web/.next/static
COPY apps/web/package.json ./apps/web/package.json
COPY apps/web/node_modules ./apps/web/node_modules

USER nextjs

WORKDIR /app/apps/web

EXPOSE 3000

ENV PORT 3000
ENV NEXT_PUBLIC_BACKEND_URL=http://backend:3001

CMD ["node", ".next/standalone/server.js"]
