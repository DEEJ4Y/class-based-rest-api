const asyncHandler = require("../middleware/async");
class Service {
  constructor(model) {
    this.model = model;
  }

  createResource = asyncHandler(async (reqBody) => {
    return await this.model.create(reqBody);
  });

  getOneById = asyncHandler(async (id) => {
    return await this.model.findById(id);
  });

  updateOneById = asyncHandler(async (id, reqBody) => {
    return await this.model.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });
  });

  deleteById = asyncHandler(async (id) => {
    return await this.model.findByIdAndDelete(id);
  });
}

module.exports = Service;
