FROM node:16-alpine

ARG ENV_FILE

WORKDIR /app

COPY . .

RUN apk  add git && \
    yarn install --link-duplicates --ignore-optional && \
    yarn build && \
    yarn cache clean --all

EXPOSE 3000

CMD [ "yarn", "preview" ]