FROM nginx

VOLUME /usr/share/nginx/html/assets/config
EXPOSE 80
COPY /dist/angular-docker-test/ /usr/share/nginx/html
