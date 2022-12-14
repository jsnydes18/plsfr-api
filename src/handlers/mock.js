import express from "express";

import bunyan from "bunyan";
import { v4 as uuidv4 } from "uuid";

const mock = express.Router();

mock.put("/submit", async (req, res) => {
  const { input } = req.body;
  const reqId = uuidv4();

  return res.status(200).send({
    reqId,
  });
});

mock.get("/pull", async (req, res) => {
  const { reqId } = req.query;
  const pages = [];
  const numPages = Math.ceil(Math.random() * 10);
  for (let x = 0; x <= numPages; x += 1) {
    const playlists = [];
    for (let y = 0; y <= Math.ceil(Math.random() * 25); y += 1) {
      playlists.push({
        name: "test",
        followers: Math.ceil(Math.random() * 10000),
        tracks: Math.ceil(Math.random() * 200),
        popularity: Math.random() * 100,
        lastModified: `${Math.ceil(Math.random() * 365)} days ago`,
        ownerDetails: {
          spotify: "1234567890",
          instagram: "@testinsta",
          twitter: "@testtwit",
          email: "testemail@testurl.com",
        },
      });
    }
    pages.push({
      pageNum: x,
      playlists,
    });
  }

  return res.status(200).send({
    reqId,
    results: pages,
  });
});

export default mock;
