# FROM nginx:1.23.3

# COPY build  /usr/share/nginx/html
# COPY nginx /etc/nginx

# ENTRYPOINT ["nginx","-g","daemon off;"]

FROM nginx:1.23.3

COPY build  /usr/share/nginx/html
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx","-g","daemon off;"]
