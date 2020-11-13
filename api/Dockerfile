FROM node:alpine AS server
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
