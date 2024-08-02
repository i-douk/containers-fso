FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY package*.json ./

RUN npm install 

ENV DEBUG=playground:*

COPY package*.json ./

USER node

CMD ["npm", "run", "dev", "--", "--host"]