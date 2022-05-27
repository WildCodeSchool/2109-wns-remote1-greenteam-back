FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./tsconfig.json ./
COPY ./src ./src
COPY ./ormconfig.ts ./src/

RUN yarn build

CMD cd build && node ./index.js