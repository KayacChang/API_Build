FROM node:12-stretch

ARG src=./core

WORKDIR /usr/src/app

COPY ${src} .
COPY .env .

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "start" ]
