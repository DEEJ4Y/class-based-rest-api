const Router = require("../routes/index");

class ModelData {
  constructor({ apiModel, modelName, router }) {
    this.apiModel = apiModel;
    this.modelName = modelName;
    this.router = router || new Router(this.apiModel, this.modelName);
  }

  getModelData() {
    return {
      apiModel: this.apiModel,
      modelName: this.modelName,
      router: this.router,
    };
  }
}

module.exports = ModelData;
