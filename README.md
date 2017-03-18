# Remote-Wake-On-Lan-Server-Client
Sever and client to remote wake any device in your lan. Inspired by https://github.com/sciguy14/Remote-Wake-Sleep-On-LAN-Server

The server is a simple [Node](https://nodejs.org/) application to handle the request made with [Express](https://expressjs.com/). The client is an [Angular](https://angular.io/) application with a simple interface made with [Angular Material](https://github.com/angular/material2) and [Flex Layout](https://github.com/angular/flex-layout).

## Build the project

To build the project you will need nodejs and npm installed
1. Change the `config.js` file with your data 
1. Open the terminal and go to the location of the project
2. Install dependencies of the server:

    `npm install`

3. Enter the client and install dependencies

    `cd client`

    `npm install`

4. Build the client and launch the server

    `npm run build`
    
5. Enter `localhost:3000` in the web browser to see your page and try it
