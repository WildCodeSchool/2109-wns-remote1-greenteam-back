FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./tsconfig.json ./
COPY ./src ./src
# ormconfig au même niveau que les sources pour le build
COPY ./ormconfig.ts ./src

RUN yarn build

# On ramène l'ormconfig transpilée au niveau du package.json
# Si elle n'est pas à ce niveau TypeORM ne la trouve pas
# Issue qui a permis de trouver la solution :
# https://github.com/typeorm/typeorm/issues/7960
RUN mv build/ormconfig.* ./

CMD node build/index.js
