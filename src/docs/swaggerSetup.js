const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf8")
);

module.exports = { swaggerUi, swaggerDocument };
