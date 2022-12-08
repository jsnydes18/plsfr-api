import bunyan from "bunyan";

const log = bunyan.createLogger({ name: "mw" });

const requestStart = () => (req, res, next) => {
  req.log = log.child({
    requestPath: req.url,
    httpVerb: req.method,
    params: req.params,
    headers: req.headers,
  });
  next();
};

const requestComplete = () => (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    req.log.info({
      responseCode: res.statusCode,
    });
  });
  next();
};

export { requestStart, requestComplete };
