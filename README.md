# Todo App using NextJS

A simple Todo Application made using NextJS.  
[Click here](https://simply-do-it.vercel.app/) to see the deployed version.

## Tech Stack Used

1. NextJS
1. TypeScript
1. TailwindCSS
1. Browser localStorage API for data persistance (with a custom React Hook)
1. Also used React Context API for state management

## Local Setup

```sh
pnpm install
pnpm run start
```

## Local Setup using Docker Recommended

```sh
docker build . -t todo-app
docker run -p 3000:3000 todo-app
```
