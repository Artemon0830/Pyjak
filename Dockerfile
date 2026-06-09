FROM node:20-alpine

RUN mkdir /app

WORKDIR /app


COPY ./backend/package.json /app

RUN npm i


