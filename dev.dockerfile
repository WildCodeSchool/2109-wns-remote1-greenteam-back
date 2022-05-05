FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

COPY *.json ./

RUN yarn
COPY src src

CMD yarn start