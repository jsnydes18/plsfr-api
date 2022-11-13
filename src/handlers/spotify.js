import express from 'express';

const spotify = express.Router();

import os from 'os';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: "spotify-handler"});

import { Spotify } from '../bin/Spotify.js'
const client_id = process.env.spApiClientId;
const client_secret = process.env.spApiClientSecret;
const spApi = await Spotify.createClient(client_id, client_secret);

spotify.get('/', (req, res) => {
  return res.status(200).send({
    'Node Host': os.hostname(),
  })
});

spotify.get('/test', async (req, res) => {
  try {
    const contents = await spApi.genreSearch();
    return res.status(200).send({contents});
  } catch (e) {
    console.log(e)
    return res.status(500).send({e})
  }
})

export {
  spotify
};
