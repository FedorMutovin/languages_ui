# syntax=docker/dockerfile:1

ARG NODE_VERSION

FROM node:$NODE_VERSION-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

RUN corepack enable
RUN pnpm add -g @quasar/cli

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

FROM base

WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .

CMD ["quasar", "dev"]

EXPOSE 9000
