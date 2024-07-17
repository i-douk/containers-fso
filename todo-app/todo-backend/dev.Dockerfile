FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .


RUN npm ci 

ENV MONGO_URL=mongodb://the_username:the_password@mongo:3456/the_database

ENV REDIS_URL=redis//redis:6379

ENV DEBUG=playground:*

COPY package*.json ./
USER node

CMD ["npm", "run", "dev", "--", "--host"]