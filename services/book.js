const asyncHandler = require("../middleware/async");
const Service = require("./index");

class BookService extends Service {
  getAllBooks = asyncHandler(async () => {
    return await this.model.find();
  });
}

module.exports = BookService;
