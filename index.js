import https from 'https';
import http from 'http';

import bunyan from 'bunyan';
const log = bunyan.createLogger({name: "logger"});

import config from 'config';
import { app } from './src/app.js'

let httpListenerPort = 8080;
let httpsListenerPort = 8443;

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
   log.info(`HTTP Server Up at localhost:${httpListenerPort}`);
})

const httpsServer = https.createServer(app).listen(httpsListenerPort, () => {
      log.info(`HTTPS Server Up at localhost:${httpsListenerPort}`);
})