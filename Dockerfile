FROM node:lts

RUN mkdir /app 

COPY . ./app
WORKDIR /app

RUN npm install --quiet
RUN npm run build
RUN npm publish

