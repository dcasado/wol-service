FROM node:10 as web

WORKDIR /home/node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin 

USER node
COPY --chown=node:node ./client/package*.json ./client/
RUN cd client \
    && npm install -g @angular/cli@1.0.0-rc.1 \
    && npm install --save @angular/material@2.0.0-beta.2 \
    && npm install

COPY --chown=node:node ./client ./client/
RUN cd client && ng build

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

COPY --from=web /home/node/client/dist ./client/
COPY ./config.js ./
COPY ./app.js ./
COPY ./computers.json ./
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 744 /usr/local/bin/docker-entrypoint.sh
RUN echo $PATH

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "npm", "start" ]
