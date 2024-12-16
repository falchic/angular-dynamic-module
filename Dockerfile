### STAGE 1: Build ###

FROM node:latest AS build-stage

WORKDIR /app

COPY ./ /app/

RUN npm install

RUN npm run build

### STAGE 2: Run ###

FROM docker.io/nginxinc/nginx-unprivileged:alpine3.18

# Copy the default nginx.conf
COPY --from=build-stage /app/nginx/conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/angular-playground/ /usr/share/nginx/html

USER 0

RUN mkdir /etc/nginx/logs
RUN chgrp 0 /etc/nginx/logs && chmod -R g=u /etc/nginx/logs

RUN mkdir /var/cache/nginx/client_temp
RUN chgrp 0 /var/cache/nginx/client_temp && chmod -R g=u /var/cache/nginx/client_temp

USER 10001

EXPOSE 1080
