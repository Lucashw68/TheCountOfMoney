# Test

FROM node:latest as build-stage
ENV APP_ROOT /build
ARG API_URL
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY package*.json ${APP_ROOT}/
RUN npm install
COPY . .
RUN npm run build
ENV HOST 0.0.0.0

# Production

# étape de build
  # FROM node:latest as build-stage
  # WORKDIR /client_web
  # COPY package*.json /client_web/
  # RUN npm install
  # COPY . .
  # RUN npm run build

# étape de production // TODO config nginx
  # FROM nginx:stable-alpine as production-stage
  # COPY --from=build-stage /client_web/.nuxt/dist /usr/share/nginx/html
  # RUN rm /etc/nginx/conf.d/default.conf
  # COPY nginx/nginx.conf /etc/nginx/conf.d
  # EXPOSE 3000
  # CMD ["nginx", "-g", "daemon off;"]
