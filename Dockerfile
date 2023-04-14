FROM node:14.15

WORKDIR /opt
COPY ./package.json /opt
RUN npm install