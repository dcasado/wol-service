FROM node:10

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

WORKDIR /home/node/app

COPY ./package.json ./

RUN npm install \
    && npm ci --only=production

COPY ./config.js ./
COPY ./app.js ./
COPY ./computers.json ./
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 744 /usr/local/bin/docker-entrypoint.sh
RUN echo $PATH

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "npm", "start" ]
