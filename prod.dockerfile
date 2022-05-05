FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./tsconfig.json ./
COPY ./ormconfig.ts ./
COPY ./src ./src

RUN yarn build

CMD cd dist && node ./index.js