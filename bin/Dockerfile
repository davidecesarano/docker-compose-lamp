FROM ubuntu:18.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install --assume-yes apt-utils

# software
RUN apt-get install -y curl zip git nano software-properties-common

# apache
RUN apt-get install -y apache2

# locale
RUN apt-get install -y language-pack-en-base language-pack-it
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# php 7.4
RUN add-apt-repository ppa:ondrej/php
RUN apt-get update && apt-get install -y php7.4 php7.4-cli php7.4-common php7.4-intl php7.4-mbstring php7.4-soap php7.4-xml php7.4-zip php7.4-apcu php7.4-json php7.4-gd php7.4-curl php7.4-mysql php7.4-xmlrpc libapache2-mod-php7.4

# cronolog
RUN apt-get install -y cronolog


# certbot / letsencrypt
RUN apt-get update
RUN apt-get install software-properties-common
RUN add-apt-repository universe
RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update
RUN apt-get install -y certbot python-certbot-apache
	
# certbotauto
RUN cd /usr/local/sbin \
	&& curl -s https://dl.eff.org/certbot-auto > certbot-auto \
	&& chmod a+x certbot-auto

# composer
RUN mkdir /tmp/composer \
	&& cd /tmp/composer \
	&& curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/composer

# servername
RUN echo "ServerName localhost" >> /etc/apache2/httpd.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# active mods
RUN a2enmod rewrite ssl headers proxy proxy_http proxy_wstunnel

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
	&& apt-get install -y nodejs build-essential \
	&& mkdir /opt/node

# install apt-transport-https for yarn repository
RUN apt-get install apt-transport-https -y

# add yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# update
RUN apt-get update -y

# install yarn
RUN apt-get install yarn -y
RUN apt-get install build-essential

# install pm2
RUN npm i -g pm2

# start cron
RUN service cron start

# start apache2 and pm2 apps
ENTRYPOINT pm2 start /opt/node/ecosystem.config.js && apachectl -D FOREGROUND && /bin/bash