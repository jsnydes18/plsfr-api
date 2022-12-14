import express from "express";

import os from "os";
import bunyan from "bunyan";
import config from "config";
import submitRequest from "../bin/submitRequest.js";
import pullResults from "../bin/pullResults.js";

const log = bunyan.createLogger({ name: "queue-handler" });

const queue = express.Router();

queue.get("/", (req, res) => {
  return res.status(200).send({
    "Node Host": os.hostname(),
  });
});

queue.put("/submit", async (req, res) => {
  const { input } = req.body;
  let reqId;
  try {
    reqId = await submitRequest(input);
  } catch (e) {
    log.error(e);
    return res.status(config.code.intError).send(config.msg.intError);
  }

  return res.status(config.code.success).send({
    reqId,
  });
});

queue.get("/pull", async (req, res) => {
  const { reqId } = req.query;
  let results;
  try {
    results = await pullResults(reqId);
  } catch (e) {
    log.error(e);
    return res.status(config.code.intError).send(config.msg.intError);
  }

  return res.status(config.code.success).send({
    reqId,
    results,
  });
});

export default queue;
