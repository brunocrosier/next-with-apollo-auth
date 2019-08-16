## next-with-apollo-auth

A demonstration and starting point for applications using Next.js + Apollo GraphQL (hooks) + Prisma / GraphQL Yoga + JWT for authentication, and deploying to now.sh 

## Pre-requisites

You should already have a Prisma GraphQL backend server up and running. If you do not, follow [this guide.](https://www.prisma.io/docs/get-started/)

[Now CLI](https://zeit.co/download) should be installed. If you do not have this yet, type `npm i -g now` in your terminal.

## Getting started

1) Run `npm install` inside both the `frontend` and `backend` folders to install all the required dependencies.

2) Create a file named `.env` within the `frontend` folder like so:

    ```
    ## replace this with your Prisma backend URL. Likely it will be a Heroku url
    PRISMA_ENDPOINT=https://dockerprismating-6e1f3cd25a.herokuapp.com/prismatest3/dev
    ## smash your keyboard a bit to make a secrets
    PRISMA_SECRET=sdgGhwgg82425772hDGH
    ## smash your keyboard a bit more to make another secret
    APP_SECRET=jSUdg24ugrgu8dgHDgsn
    ```

3) Add your secrets to now CLI  ([read more about this here](https://zeit.co/docs/v2/build-step#using-environment-variables-and-secrets))

type `now secret add prisma_secret INSERT-YOUR-PRISMA-SECRET-FROM-STEP-2-HERE` 
type `now secret add app_secret INSERT-YOUR-APP-SECRET-FROM-STEP-2-HERE` 

4) Open `backend/now.json` and add your prisma backend URL to `PRISMA_ENDPOINT`

5) Run `npm run dev` from both the backend and frontend folders

Your GraphQL Yoga server will be on `[localhost:4000](http://localhost:4000)` and the Next.js app will be on `localhost:3000`

7) Visit `[localhost:3000/signup](http://localhost:3000/signup)` and start testing the flow. You can view all users at `localhost:3000/users`

## Notes

This is **very** rough, but it works. I will aim to clean it up a bit soon.

One issue: when you change your schema.graphql you need to run `npm run dev` before it will work properly with GraphQL yoga, due to an issue with importing

## Deployment

1) Run `now` from the `frontend` folder. Take note of the your frontend URL which will be shown in the now CLI

2) In the `backend` folder, edit the `.env` file you created in the "Getting Started" section and the `now.json` file to reflect the frontend URL (edit the value of `PRODUCTION_FRONTEND_URL` )
3) Run `now` from the `backend` folder. Take note of the backend URL which will be shown in the now CLI

4) In the `frontend` folder add your GraphQL Yoga url to `next.config.js`  

## Authors

Bruno Crosier