FROM php:8.2-apache
WORKDIR /var/www/html
COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html
RUN a2enmod rewrite
RUN sed -i 's/80/${PORT:-80}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf
EXPOSE 80
CMD ["apache2-foreground"]
