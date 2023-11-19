FROM node:18-alpine

WORKDIR /app

COPY app/package.json /app

RUN npm install -g pnpm 

RUN pnpm install --production

COPY app /app

