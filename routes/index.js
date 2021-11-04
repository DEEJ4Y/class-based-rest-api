const Controller = require("../controllers/index.js");

class Router {
  constructor(model, modelName, controller) {
    this.controller = controller || new Controller(model, modelName);
    this.router = require("express").Router({ mergeParams: true });

    this.endpoint = `/`;
    this.endpointWithId = `/:${modelName}Id`;

    this.router.route(this.endpoint).post((req, res, next) => {
      this.controller.createResource(req, res, next);
    });
    this.router
      .route(this.endpointWithId)
      .get((req, res, next) => {
        this.controller.getOneById(req, res, next);
      })
      .put((req, res, next) => {
        this.controller.updateOneById(req, res, next);
      })
      .delete((req, res, next) => {
        this.controller.deleteById(req, res, next);
      });
  }

  create() {
    return this.router;
  }
}

module.exports = Router;
