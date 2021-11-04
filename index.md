# Mongoose Express REST API Project Skeleton

A Express and Mongoose REST API skeleton project.

## Getting started

This is meant to be a starter project template.

1. Fork the project.

OR

1. [Download the ZIP file](https://github.com/DEEJ4Y/class-based-rest-api/archive/refs/heads/master.zip) and extract its contents.
2. Update `package.json` with your own name, version and description.
3. Install the node modules.

   ```shell
   npm install
   ```

   OR

   ```shell
   npm i
   ```

4. Update `config/config.env` with a custom PORT and MONGO_URI.

   ```env
   PORT=3000

   MONGO_URI=mongodb://localhost:27017/classBasedRestApiDb
   ```

5. Start the development server from the terminal.

   ```shell
   npm run dev
   ```

## Usage

Lets take an example of a simple API for books. [View the example project here](https://github.com/DEEJ4Y/class-based-rest-api-example).

Create a file `models/Book.js`. In this file we will add our mongoose Schema for a Book.

```js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Book", BookSchema);
```

Now that our schema is ready we can make the API.

In `loaders/expressLoader.js`, create a new instance of the Api class after the `developmentHelpers` middleware.

```js
let myApi = new Api();
```

To this instance we can add our mongoose schemas using the `ModelData` class.

In `loaders/expressLoader.js`, require the mongoose schema for Book.

```js
const Book = require("../models/Book");
```

Create an instance of the `ModelData` class for the `Book` schema.

```js
const bookModelData = new ModelData({
  apiModel: Book,
  modelName: "book",
});
```

By default this creates a `Router` instance with a `Controller` and `Service` instance, using the `apiModel` and `modelName`.

`apiModel` should have a value of the mongoose schema, in our case `Book`.

`modelName` should have a string for the schema which will be used for its api route.

Now we can add the `ModelData` instance called `bookModelData` to our Api instance.

```js
myApi.addModelData(bookModelData);
```

Finally, after adding our `ModelData` to our `Api` instance, we can initialize the routers.

```js
myApi.initRouters(app);
```

This adds the `Router` instances to our express application.

Restart the server. Your REST API is now ready.

This creates 4 routes by default:

| Request Type | Route          | Description          |
| ------------ | -------------- | -------------------- |
| POST         | /books/        | Create a book.       |
| GET          | /books/:bookId | Get a book by id.    |
| PUT          | /books/:bookId | Update a book by id. |
| DELETE       | /books/:bookId | Delete a book by id. |

## Using the classes to extend functionality

Lets say we want to add a route to get all books.

Create a file `services/book.js`. We will add a function to our service by inheritance.

```js
const Service = require("./index");

class BookService extends Service {
  async getAllBooks() {
    try {
      return await this.model.find();
    } catch (err) {
      return undefined;
    }
  }
}

module.exports = BookService;
```

Now we will create a custom Controller to use our new `BookService`.

Create a file `controllers/book.js`. We will add a function to our controller just like we did for `BookService`.

```js
const Controller = require("./index");
const BookService = require("../services/book");

const SuccessfulResponse = require("../middleware/succesfulResponse");
const ErrorResponse = require("../utils/errorResponse");

class BookController extends Controller {
  constructor(model, modelName) {
    super(model, modelName, new BookService(model));
  }

  async getAllBooks(req, res, next) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = BookController;
```

Now we will make our own router that uses `BookController`. Create a file `routes/book.js`.

```js
const Router = require("./index");
const BookController = require("../controllers/book");

class BookRouter extends Router {
  constructor(model, modelName) {
    super(model, modelName, new BookController(model, modelName));

    this.router.route(this.endpoint).get((req, res, next) => {
      this.controller.getAllBooks(req, res, next);
    });
  }
}

module.exports = BookRouter;
```

Require `BookRouter` in `loaders/expressLoader.js`

```js
const BookRouter = require("../routes/book");
```

Now that we have our `BookRouter` we only have to update our `ModelData` instance. We will add the router option to `bookModelData`.

```js
const bookModelData = new ModelData({
  apiModel: Book,
  modelName: "book",
  router: new BookRouter(Book, "book"),
});
```

Restart the server. Your updated REST API is now ready.

| Request Type | Route          | Description          |
| ------------ | -------------- | -------------------- |
| POST         | /books/        | Create a book.       |
| GET          | /books/        | Get all books.       |
| GET          | /books/:bookId | Get a book by id.    |
| PUT          | /books/:bookId | Update a book by id. |
| DELETE       | /books/:bookId | Delete a book by id. |

[View the example project here](https://github.com/DEEJ4Y/class-based-rest-api-example).
