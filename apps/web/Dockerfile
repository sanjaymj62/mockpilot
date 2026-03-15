FROM node:20-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

COPY apps/web/.next/standalone ./
COPY apps/web/.next/static ./mockpilot/apps/web/.next/static
COPY apps/web/public ./mockpilot/apps/web/public

USER nextjs

WORKDIR /app/mockpilot/apps/web

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
