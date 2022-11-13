
import express from 'express';
import helmet from 'helmet';

import bunyan from 'bunyan';
const log = bunyan.createLogger({name: "logger"});

import bodyParser from 'body-parser';
import { requestStart, requestComplete } from './middleware/logging.js'

import config from 'config';

const app = express();

const basePath = '/playlist';

import { spotify } from './handlers/spotify.js'

app.use(helmet({
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

app.use(bodyParser.json());

app.use(`${basePath}/spotify`, spotify);

app.use(requestStart());
app.use(requestComplete());

export {
  app
};