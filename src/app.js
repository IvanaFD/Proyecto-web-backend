const express = require("express");
const cors = require("cors");
const path = require("path");
const petRoutes = require("./routes/pet.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger");


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pets", petRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  res.json({ message: "Adopt Tracker API is running" });
});

module.exports = app;
