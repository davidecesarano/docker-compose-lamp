FROM ubuntu:16.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install --assume-yes apt-utils

RUN apt-get install -y curl zip git nano software-properties-common python-software-properties

RUN apt-get install -y apache2

RUN apt-get install -y language-pack-en-base 
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
RUN add-apt-repository ppa:ondrej/php

RUN apt-get update \
	&& apt-get install -y \
		php7.2 \
		php7.2-cli \
		php7.2-common \
		php7.2-intl \
		php7.2-mbstring \
		php7.2-soap \
		php7.2-xml \
		php7.2-zip \
		php7.2-apcu \
		php7.2-json \
		php7.2-gd \
		php7.2-curl \
		php7.2-mysql \
		php7.2-xmlrpc \
		libapache2-mod-php7.2 

#certbot / letsencrypt
RUN apt-get install -y software-properties-common \
	&& add-apt-repository ppa:certbot/certbot \
	&& apt-get update \
	&& apt-get install -y python-certbot-apache

#composer
RUN mkdir /tmp/composer && \
	curl -sS https://getcomposer.org/installer | php && \
	mv composer.phar /usr/local/bin/composer

RUN echo "ServerName localhost" >> /etc/apache2/httpd.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

#nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
	&& apt-get install -y nodejs \
			   build-essential \
	&& mkdir /opt/node

# actvite mod_rewrite
RUN a2enmod rewrite ssl headers

CMD apachectl -D FOREGROUND
