const express = require("express");

// Security
const security = require("./expressLoader/security");

// Utility
const errorHandler = require("../middleware/error");
const developmentHelpers = require("./expressLoader/dev");

// Api maker
const Api = require("../api");
const ModelData = require("../models/modelData");

// Models for Api maker
const Book = require("../models/Book");

// Routers
const BookRouter = require("../routes/book");

module.exports = (app) => {
  // Body parser
  app.use(express.json());

  // Security
  security(app);

  // Dev logging middleware
  developmentHelpers(app);

  // Create API Instance
  let v1Api = new Api({
    // Prefix for all api routes. Default is index ("/").
    routePrefix: "/api/v1",
  });

  // Set model data
  let bookModelData = new ModelData({
    // Model: Mongoose model
    apiModel: Book,

    // Model Name: Name that will be used for your route (singular).
    modelName: "book",

    // Router: Uses the default router if not provided.
    router: new BookRouter(Book, "book"),
  });

  // Add model data to API
  v1Api.addModelData(bookModelData);

  // Mount routers
  v1Api.initRouters(app);

  app.use("/", (req, res) => {
    res.status(200).json({ success: true });
  });

  // Custom error handler middleware
  app.use(errorHandler);

  return app;
};
