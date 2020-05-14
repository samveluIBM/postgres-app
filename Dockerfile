FROM sinenomine/nodejs-s390x:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN sudo npm install -g --unsafe-perm=true --allow-root
COPY . /usr/src/app
EXPOSE 8080
CMD ["npm", "start"]
