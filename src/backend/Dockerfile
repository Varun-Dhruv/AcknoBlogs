FROM node:18.0.0-alpine3.14 as backend

WORKDIR /app

COPY app/package.json /app

RUN npm install --production

COPY app /app

