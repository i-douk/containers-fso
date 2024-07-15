FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

# COPY /Todos/List.test.jsx src/Todos/List.test.jsx

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm run build

RUN npm run test

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html