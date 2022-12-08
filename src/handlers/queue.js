import express from "express";

import os from "os";
import bunyan from "bunyan";

const log = bunyan.createLogger({ name: "queue-handler" });

const queue = express.Router();

queue.get("/", (req, res) => {
  return res.status(200).send({
    "Node Host": os.hostname(),
  });
});

queue.get("/submit", async (req, res) => {

});

queue.get("/pull", async (req, res) => {

});

export default queue;
