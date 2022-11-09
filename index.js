const https = require('https')
const http = require('http')
//  const log = require('bunyan')

const config = require('config')
const app = require('./src/app')

let httpListenerPort = 8080;
let httpsListenerPort = 8443;

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
   console.log(`HTTP Server Up at localhost:${httpListenerPort}`)
})

const httpsServer = https.createServer(app).listen(httpsListenerPort, () => {
      console.log(`HTTP Server Up at localhost:${httpListenerPort}`)
})