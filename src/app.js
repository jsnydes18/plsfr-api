import express from "express";
import helmet from "helmet";

import bunyan from "bunyan";

import bodyParser from "body-parser";
import config from "config";
import { requestStart, requestComplete } from "./middleware/logging.js";

import spotify from "./handlers/spotify.js";
import queue from "./handlers/queue.js";

const log = bunyan.createLogger({ name: "logger" });

const app = express();

const basePath = "/plsfr";

app.use(
  helmet({
    crossDomain: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSnifff: true,
    xssFilter: true,
  })
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
    reportOnly: true,
  })
);

app.use(bodyParser.json());

app.use(`${basePath}/spotify`, spotify);
app.use(`${basePath}/queue`, queue);

app.use(requestStart());
app.use(requestComplete());

export default app;
