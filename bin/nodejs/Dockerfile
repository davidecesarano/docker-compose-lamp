FROM ubuntu:18.04

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install --assume-yes apt-utils

# software
RUN apt-get install -y curl zip nano software-properties-common

# locale
RUN apt-get install -y language-pack-en-base language-pack-it
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

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
# start apache2 and pm2 apps
ENTRYPOINT pm2-runtime /opt/node/ecosystem.config.js
