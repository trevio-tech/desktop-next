FROM node:lts-stretch-slim

WORKDIR /application

ARG ENV_FILE

COPY . .

RUN apt update && apt upgrade -y  \
    && apt install git        -y  \
    && npm install --force --legacy-peer-deps            \
    && touch .env \
    && echo $ENV_FILE | base64 -d > .env \
    && npm run build                 \
    && apt remove git  -y             \
    && apt autoclean  -y          \
    && apt autoremove -y \
    && npm cache clean -f

USER nobody

EXPOSE 3000

CMD ["yarn", "preview"]