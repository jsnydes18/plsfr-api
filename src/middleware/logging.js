const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "mw"});

exports.requestStart = () => (req, res, next) => {
  req.log = log.child({
    requestPath: req.url,
    httpVerb: req.method,
    params: req.params,
    headers: req.headers,
  });
  next();
}

exports.requestComplete = () => (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    req.log.info({
      responseCode: res.statusCode,
    },);
  });
  next();
};