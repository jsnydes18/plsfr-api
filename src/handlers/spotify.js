const express = require('express');

const router = express.Router();
const os = requrie('os');

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "spotify-handler"});

router.get('/', (req, res) => {
  return res.status(200).send({
    'Node Host': os.hostname(),
  })
});

module.exports = router;