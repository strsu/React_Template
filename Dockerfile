FROM node:18.16

WORKDIR /opt
COPY ./app/package*.json /opt
RUN npm install