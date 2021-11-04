const Service = require("../services/index.js");
const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");

class Controller {
  constructor(model, modelName, service) {
    this.service = service || new Service(model);
    this.modelName = modelName;
  }

  async createResource(req, res, next) {
    try {
      const resource = await this.service.createResource(req.body);

      if (!resource) {
        return next(
          new ErrorResponse(
            `The ${this.modelName} was not created due to an error with the request data.`,
            404
          )
        );
      }

      new SuccessfulResponse(
        res,
        201,
        `The ${this.modelName} was successfully created.`,
        resource
      ).buildResponse();
    } catch (err) {
      console.error(err);
    }
  }

  async getOneById(req, res, next) {
    try {
      const id = req.params[`${this.modelName}Id`];
      const resource = await this.service.getOneById(id);

      if (!resource) {
        return next(
          new ErrorResponse(
            `A ${this.modelName} was not found with an id of ${id}`,
            404
          )
        );
      }

      new SuccessfulResponse(
        res,
        200,
        `The ${this.modelName} was successfully found.`,
        resource
      ).buildResponse();
    } catch (err) {
      console.error(err);
    }
  }

  async updateOneById(req, res, next) {
    try {
      const id = req.params[`${this.modelName}Id`];
      const resource = await this.service.updateOneById(id, req.body);

      if (!resource) {
        return next(
          new ErrorResponse(
            `A ${this.modelName} was not found with an id of ${id}`,
            404
          )
        );
      }

      new SuccessfulResponse(
        res,
        200,
        `The ${this.modelName} was successfully updated.`,
        resource
      ).buildResponse();
    } catch (err) {
      console.error(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      const id = req.params[`${this.modelName}Id`];
      await this.service.deleteById(id);

      new SuccessfulResponse(
        res,
        200,
        `The ${this.modelName} was successfully updated.`,
        {}
      ).buildResponse();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Controller;
