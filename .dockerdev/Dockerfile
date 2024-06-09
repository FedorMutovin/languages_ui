# syntax=docker/dockerfile:1

ARG NODE_VERSION

FROM node:$NODE_VERSION-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn
RUN yarn global add @quasar/cli@latest

COPY . .

CMD ["quasar", "dev"]

EXPOSE 9000
