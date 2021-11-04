class Api {
  // Takes the express app as a param
  constructor({ routePrefix }) {
    // Prefix for api routes
    this.routePrefix = routePrefix || "";

    // Array with model data
    this.models = [];
  }

  addModelData(modelData) {
    const data = modelData.getModelData();
    console.log(`Adding model data: ${data.modelName}`);
    this.models.push(data);
  }

  initRouters(app) {
    // Initialize routers for each model
    console.log("Initializing routers...");
    this.models.forEach(({ modelName, router }) => {
      app.use(`${this.routePrefix}/${modelName}s`, router.create());
      console.log(`Initialized router: ${modelName}`);
    });
    console.log("Routers initialized");
  }
}

module.exports = Api;
