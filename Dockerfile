FROM node:8.9.3
RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install
ADD . /app
RUN npm run tsc
