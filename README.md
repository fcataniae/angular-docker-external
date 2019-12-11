construir la imagen

docker build -t nginx-external-confs .


levantar docker mapeando nuevas configuraciones


docker run -v C://Users/Franco/angular-docker-test/:/usr/share/nginx/html/assets/config -p 8343:80 --name angular-app2 nginx-external-confs
