FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g server

COPY . .

RUN npm run build

EXPOSE 5773

CMD [ "npm", "run", "dev" ]