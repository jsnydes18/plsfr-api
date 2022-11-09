const express = require('express');
const helmet = require('helmet');

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "logger"});

const cookieParser = require('cookier-parser');
const bodyParser = require('body-parser')
const loggingMiddleware = require('./middleware/logging')

const config = require('config');

const app = express();

const basePath = '/playlist';

const spotify = require('./handlers/Spotify')

app.use(helment({
  crossDomain: true,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSnifff: true,
  xssFilter: true,
}));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    },
    reportOnly: true,
  })
);

app.use(cookieParser);
app.use(bodyParser.json());

app.use(`${basePath}/spotify`, spotify);

app.use(loggingMiddleware.requestStart());
app.use(loggingMiddleware.requestComplete())