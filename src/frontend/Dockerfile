FROM node:18.0.0-alpine3.14 as frontend

WORKDIR /app

COPY app/package.json /app

RUN npm install --production

COPY app /app

RUN npm run build

