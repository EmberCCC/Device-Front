FROM nginx:1.23.3

COPY build  /usr/share/nginx/html
COPY nginx /etc/nginx

ENTRYPOINT ["nginx","-g","daemon off;"] 
