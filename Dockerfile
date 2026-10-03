FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    curl \
    git \
    nodejs \
    npm \
    libzip-dev \
    unzip \
    sqlite-dev \
    nginx \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev

RUN docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Setup Nginx
RUN echo 'server { \
    listen 8080; \
    root /var/www/html/public; \
    index index.php index.html; \
    location / { \
        try_files $uri $uri/ /index.php?$query_string; \
    } \
    location ~ \.php$ { \
        include fastcgi_params; \
        fastcgi_pass 127.0.0.1:9000; \
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; \
    } \
}' > /etc/nginx/http.d/default.conf

EXPOSE 8080

CMD touch database/database.sqlite && php artisan migrate --force && php-fpm -D && nginx -g "daemon off;"
