FROM node:20-alpine

RUN corepack enable

WORKDIR /usr/src/app

COPY package* .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
