FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install Node.js and npm
RUN     yum install -y npm git

# Install bower package manager globally
RUN npm install bower -g

# Copy package management files, and download dependencies
COPY ./.bowerrc /src/twilio-client/.bowerrc
COPY ./bower.json /src/twilio-client/bower.json
COPY ./demo-server/package.json /src/twilio-client/demo-server/package.json

# Install client dependencies
RUN cd /src/twilio-client; bower install --allow-root

# Install server dependencies
RUN cd /src/twilio-client/demo-server; npm install

# Bundle app source
COPY . /src/twilio-client

# Expose server port
EXPOSE 3000

# Default command to run, if building with config.json. Otherwise, please run this command with proper parameters.
# List of required parameters is described in the README.md file.
CMD ["node", "/src/twilio-client/demo-server/index.js"]
