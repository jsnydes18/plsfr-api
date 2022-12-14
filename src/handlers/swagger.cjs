const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swagger = express.Router();;

const swaggerDocPath = path.join(__dirname, "../../swagger.json");
const swaggerDocument = require("../../swagger.json");

const options = {
  customCss: ".swagger-ui .topbar { display: none}",
};

// Primary Swagger UI Endpoint
swagger.use("/", swaggerUi.serve);
swagger.get("/", swaggerUi.setup(swaggerDocument, options));

swagger.get("/doc", (req, res) => {
  return res.sendFile(swaggerDocPath);
});

module.exports = swagger;
