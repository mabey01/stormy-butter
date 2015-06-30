#!/usr/bin/env bash

# Get root up in here
sudo su
apt-get update -y -q

#==================== add keyserver ================================
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

# Update and begin installing some utility tools
apt-get install -y python-software-properties
apt-get install -y vim git curl
apt-get install -y memcached

#==================== install NodeJS ================================
add-apt-repository -y ppa:chris-lea/node.js
apt-get -y update
apt-get install -y nodejs

#==================== install MongoDB (Database) ================================
apt-get install -y mongodb-10gen