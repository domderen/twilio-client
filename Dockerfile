FROM    centos:latest

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /src/twilio

# Install client dependencies
RUN cd /src/twilio; bower install

# Install server dependencies
RUN cd /src/twilio/server-demo; npm install

EXPOSE 3000

CMD ["node", "/src/twilio/server-demo/index.js"]
