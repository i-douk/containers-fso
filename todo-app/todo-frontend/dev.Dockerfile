FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000/

CMD ["npm", "run", "dev", "--", "--host"]