class Service {
  constructor(model) {
    this.model = model;
  }

  async createResource(reqBody) {
    try {
      return await this.model.create(reqBody);
    } catch (err) {
      return undefined;
    }
  }

  async getOneById(id) {
    try {
      return await this.model.findById(id);
    } catch (err) {
      return undefined;
    }
  }

  async updateOneById(id, reqBody) {
    try {
      return await this.model.findByIdAndUpdate(id, reqBody, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      return undefined;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (err) {
      return undefined;
    }
  }
}

module.exports = Service;
