FROM node:alpine AS server
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
CMD /bin/sh -c "npm run seed && npm start"
