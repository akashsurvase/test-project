FROM node:alpine
COPY . /task-project 
WORKDIR /task-project
CMD node index.js