FROM node:20

WORKDIR /nestapp

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]