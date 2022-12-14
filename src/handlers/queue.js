import express from "express";

import os from "os";
import bunyan from "bunyan";
import { v4 as uuidv4 } from "uuid";
import submitRequest from "../bin/submitRequest.js"
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
  const reqId = await submitRequest(input);

  return res.status(200).send({
    reqId,
  });
});

queue.get("/pull", async (req, res) => {
  const { reqId } = req.query;
  const results = await pullResults(reqId);

  return res.status(200).send({
    results,
  });
});

export default queue;
