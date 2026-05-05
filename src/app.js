const express = require("express");
const cors = require("cors");
const corsOptions = require("./middleware/cors");
const petRoutes = require("./routes/pet.routes");
const { swaggerUi, swaggerDocument } = require("./docs/swaggerSetup");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Adopt Tracker API is running", version: "1.0.0", author: "Ivana Fernández Díaz, 2024", status: "ok" });
});

app.use("/pets", petRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString(),});
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
