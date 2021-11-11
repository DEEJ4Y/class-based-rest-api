const Controller = require("./index");
const BookService = require("../services/book");

const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

class BookController extends Controller {
  constructor(model, modelName) {
    super(model, modelName, new BookService(model));
  }

  getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await this.service.getAllBooks();

    if (!books) {
      return next(new ErrorResponse(`No books were found.`, 404));
    }

    new SuccessfulResponse(
      res,
      200,
      `The books were successfully found.`,
      books
    ).buildResponse();
  });
}

module.exports = BookController;
