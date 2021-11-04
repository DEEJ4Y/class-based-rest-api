const morgan = require("morgan");
module.exports = (app) => {
  const { nodeEnv } = require("../../config/config");
  if (nodeEnv === "Development") {
    app.use(morgan("dev"));
  }

  if (nodeEnv === "Development") {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE"
      );
      next();
    });
  }

  console.log("Initialized Dev logging middleware.");
};
