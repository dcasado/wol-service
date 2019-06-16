# wol-service
Sevice to remote wake any device in your lan. Inspired by https://github.com/sciguy14/Remote-Wake-Sleep-On-LAN-Server

The server is a simple [Node](https://nodejs.org/) application to handle the request made with [Express](https://expressjs.com/).

## Build the project

To build the project you will need nodejs and npm installed
1. Change the `config.js` file with your data
2. Change the `computers.json` file to add devices
3. Open the terminal and go to the location of the project
4. Install dependencies of the server:

    `npm install`

5. Launch the service

    `npm start`

6. Try it with [Postman](https://www.getpostman.com/) or some similar program

## Use Docker

To use with Docker open the terminal and execute:

`docker container run --name wol-service -e WAKE_PASSWORD_HASH=your-password -v /path-to-file/computers.json:/home/node/app/computers.json --net host davidcasado/wol-service`
