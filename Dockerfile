FROM node:18-alpine

WORKDIR /usr/local/app

COPY . .

RUN npm i -f

EXPOSE 3000

CMD [ "node", "dist/main.js" ]