FROM node:18-alpine AS base

ARG DOT_ENV

FROM base AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add git \
    && yarn install --production \
    && yarn upgrade @trevio/ui

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN echo $DOT_ENV | base64 -d > .env \
    && yarn build

CMD [ "yarn", "preview" ]