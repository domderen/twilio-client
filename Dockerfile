FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm git

RUN npm install bower -g

# Bundle app source
COPY . /src/twilio

# Install client dependencies
RUN cd /src/twilio; bower install --allow-root

# Install server dependencies
RUN cd /src/twilio/demo-server; npm install

EXPOSE 3000

CMD ["node", "/src/twilio/demo-server/index.js"]
