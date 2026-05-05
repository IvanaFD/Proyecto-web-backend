const express = require("express");
const cors = require("cors");
const path = require("path");
const petRoutes = require("./routes/pet.routes");
const { swaggerUi, swaggerDocument } = require("./docs/swaggerSetup");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pets", petRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString(),});
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  res.json({ message: "Adopt Tracker API is running", version: "1.0.0", author: "Ivana Fernández Díaz, 2024", status: "ok" });
});

app.use(errorHandler);
module.exports = app;
