const Service = require("../services/index.js");
const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

class Controller {
  constructor(model, modelName, service) {
    this.service = service || new Service(model);
    this.modelName = modelName;
  }

  createResource = asyncHandler(async (req, res, next) => {
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
  });

  getOneById = asyncHandler(async (req, res, next) => {
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
  });

  updateOneById = asyncHandler(async (req, res, next) => {
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
  });

  deleteById = asyncHandler(async (req, res, next) => {
    const id = req.params[`${this.modelName}Id`];
    await this.service.deleteById(id);

    new SuccessfulResponse(
      res,
      200,
      `The ${this.modelName} was successfully updated.`,
      {}
    ).buildResponse();
  });
}

module.exports = Controller;
