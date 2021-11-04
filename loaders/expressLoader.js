const express = require("express");

// Security
const security = require("./expressLoader/security");

// Utility
const errorHandler = require("../middleware/error");
const developmentHelpers = require("./expressLoader/dev");

// Api maker
const Api = require("../api");
const ModelData = require("../models/modelData");

module.exports = (app) => {
  // Body parser
  app.use(express.json());

  // Security
  security(app);

  // Dev logging middleware
  developmentHelpers(app);

  app.use("/", (req, res) => {
    res.status(200).json({ success: true });
  });

  // Custom error handler middleware
  app.use(errorHandler);

  return app;
};
