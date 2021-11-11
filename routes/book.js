const Router = require("./index");
const BookController = require("../controllers/book");

class BookRouter extends Router {
  constructor(model, modelName) {
    super(model, modelName, new BookController(model, modelName));

    this.router.route(this.endpoint).get(this.controller.getAllBooks);
  }
}

module.exports = BookRouter;
